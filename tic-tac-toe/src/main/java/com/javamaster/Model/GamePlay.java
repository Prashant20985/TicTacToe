package com.javamaster.Model;

import lombok.Data;

@Data
public class GamePlay {

    private Tic_Toe type;
    private Integer coordinateX;
    private Integer coordinateY;
    private String gameId;
}
