package team.dasin.backend.controller;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;
import team.dasin.backend.form.crawlingDto;
import team.dasin.backend.form.inferenceDto;
import team.dasin.backend.service.crawlingService;
import team.dasin.backend.service.inferenceService;

import java.util.Map;

@RestController
@RequiredArgsConstructor
public class inferenceController {

    private final inferenceService inferenceService;

    @PostMapping("/inference")
    public Mono<Map> performInference(@RequestBody final inferenceDto inferenceDto){
        return inferenceService.inference(inferenceDto);
    }
}
