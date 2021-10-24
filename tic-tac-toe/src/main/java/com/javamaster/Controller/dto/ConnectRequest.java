package com.javamaster.Controller.dto;

import com.javamaster.Model.Player;
import lombok.Data;

@Data
public class ConnectRequest {
    private Player player;
    private String gameId;
}
