package team.dasin.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import team.dasin.backend.form.crawlingDto;

import java.util.Map;

@RequiredArgsConstructor
@Service
public class crawlingService {

    private final WebClient webClient;

    public crawlingService() {
        this.webClient = WebClient.create("http://localhost:8000");
    }

    public Mono<Map> crawl(crawlingDto crawlingDto){
        return webClient.post()
                .uri("/api/crawl/")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(crawlingDto)
                .retrieve()
                .bodyToMono(Map.class);
    }
}
