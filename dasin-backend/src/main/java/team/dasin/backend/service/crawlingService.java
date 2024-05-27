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

@RequiredArgsConstructor
@Service
public class crawlingService {

    private final WebClient webClient;

    public crawlingService() {
        this.webClient = WebClient.create("http://localhost:8000");
    }

    public Mono<Map> crawl(String ticker) {
        crawlingDto crawlingDto = new crawlingDto(ticker, LocalDate.now().toString());
        ObjectMapper objectMapper = new ObjectMapper();
        String json = "";

        try {
            json = objectMapper.writeValueAsString(crawlingDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return webClient.post()
                .uri("/api/crawl/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(json)
                .retrieve()
                .bodyToMono(Map.class);
    }
}
