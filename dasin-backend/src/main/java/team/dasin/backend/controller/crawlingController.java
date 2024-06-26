package team.dasin.backend.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import team.dasin.backend.form.crawlingDto;
import team.dasin.backend.service.crawlingService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class crawlingController {

    private final crawlingService crawlingService;

    @Operation(summary = "crawling")
    @ResponseBody
    @PostMapping("/crawling/{ticker}")
    public Mono<Map> performCrawling(@PathVariable final String ticker){
        return crawlingService.crawl(ticker);
    }
}
