package team.dasin.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import team.dasin.backend.form.crawlingDto;
import team.dasin.backend.form.inferenceDto;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class inferenceService {

    private final WebClient webClient;

    public inferenceService() {
        this.webClient = WebClient.create("http://localhost:5000");
    }

    public Mono<Map> inference(inferenceDto inferenceDto) {
        ObjectMapper objectMapper = new ObjectMapper();
        String json = "";

        try {
            json = objectMapper.writeValueAsString(inferenceDto);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return webClient.post()
                .uri("/inference/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(json)
                .retrieve()
                .bodyToMono(Map.class);
    }
}
