package team.dasin.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import team.dasin.backend.form.crawlingDto;

import java.time.LocalDate;
import java.util.Map;
import java.util.TreeMap;

@RequiredArgsConstructor
@Service
public class predictService {

    private final WebClient crawlWebClient;
    private final WebClient inferenceWebClient;

    public predictService() {
        this.crawlWebClient = WebClient.create("http://localhost:8000");
        this.inferenceWebClient = WebClient.create("http://localhost:5000");
    }

    public Mono<TreeMap<String, Object>> predict(String ticker) {
        crawlingDto crawlingDto = new crawlingDto(ticker, LocalDate.now().toString());
        ObjectMapper objectMapper = new ObjectMapper();
        String json = "";

        try {
            json = objectMapper.writeValueAsString(crawlingDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        Mono<Map> response = crawlWebClient.post()
                .uri("/api/crawl/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(json)
                .retrieve()
                .bodyToMono(Map.class);


        return response.flatMap(crawlResult -> {
            crawlResult.put("ticker", ticker);
            String crawlJson = "";
            try {
                crawlJson = objectMapper.writeValueAsString(crawlResult);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }

            Mono<Map> prediction = inferenceWebClient.post()
                    .uri("/inference/")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(crawlJson)
                    .retrieve()
                    .bodyToMono(Map.class);

            return prediction.map(predictionResult -> {
                TreeMap<String, Object> sortedResult = new TreeMap<>();

                Map<String, Object> closePrices = (Map<String, Object>) crawlResult.get("close");
                for (Map.Entry<String, Object> entry : closePrices.entrySet()) {
                    sortedResult.put(entry.getKey(), ((Number) entry.getValue()).floatValue());
                }

                String predictionDate = LocalDate.now().plusDays(1).toString();
                Float predictionValue = ((Number) predictionResult.get("prediction")).floatValue();
                sortedResult.put(predictionDate, predictionValue);

                return sortedResult;
            });
        });
    }
}
