package team.dasin.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import team.dasin.backend.service.crawlingService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class predictController {

    private final crawlingService crawlingService;

    @Operation(summary = "predict")
    @ResponseBody
    @PostMapping("/predict/{ticker}")
    public Mono<Map> predict(@PathVariable final String ticker){
        return crawlingService.crawl(ticker);
    }

    @GetMapping("/demo")
    public String demo(){
        return "Demo Page";
    }
}
