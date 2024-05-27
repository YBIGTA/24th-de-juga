package team.dasin.backend.form;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
public class inferenceDto {

    @JsonProperty("open")
    private Map<String, Integer> open;

    @JsonProperty("high")
    private Map<String, Integer> high;

    @JsonProperty("low")
    private Map<String, Integer> low;

    @JsonProperty("close")
    private Map<String, Integer> close;

    @JsonProperty("volume")
    private Map<String, Integer> volume;

    @JsonProperty("ticker")
    private String ticker;
}
