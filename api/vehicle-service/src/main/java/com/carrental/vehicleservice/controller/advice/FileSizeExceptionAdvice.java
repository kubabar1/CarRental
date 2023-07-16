package com.carrental.vehicleservice.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class FileSizeExceptionAdvice {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, String>> handleFileSizeException() {
        Map<String, String> map = new HashMap<>();
        map.put("error", "File too large!");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(map);
    }
}
