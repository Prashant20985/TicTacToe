package com.javamaster.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Tic_Toe {
    X(1), O(2);

    private Integer value;
}
