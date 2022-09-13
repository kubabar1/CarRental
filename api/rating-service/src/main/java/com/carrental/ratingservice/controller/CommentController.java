package com.carrental.ratingservice.controller;

import com.carrental.ratingservice.model.dto.CommentWithRateAddDTO;
import com.carrental.ratingservice.model.dto.CommentWithRateResponseDTO;
import com.carrental.ratingservice.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;


    @GetMapping
    public ResponseEntity<Set<CommentWithRateResponseDTO>> getCommentsController() {
        Set<CommentWithRateResponseDTO> commentWithRateResponseDTOS = commentService.getComments();
        if (commentWithRateResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(commentWithRateResponseDTOS);
    }

    @GetMapping(value = "/vehicle/{vehicleId}")
    public ResponseEntity<Page<CommentWithRateResponseDTO>> getCommentByVehicleIdController(@PathVariable(value = "vehicleId") Long vehicleId, Pageable pageable) {
        Page<CommentWithRateResponseDTO> commentResponseDTOPage;
        try {
            commentResponseDTOPage = commentService.getCommentsByVehicleId(vehicleId, pageable);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        if (commentResponseDTOPage.getContent().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(commentResponseDTOPage);
    }

    @GetMapping(value = "/user/{userId}")
    public ResponseEntity<Set<CommentWithRateResponseDTO>> getCommentByUserIdController(@PathVariable(value = "userId") Long userId) {
        Set<CommentWithRateResponseDTO> commentWithRateResponseDTOS;
        try {
            commentWithRateResponseDTOS = commentService.getCommentsByUserId(userId);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        if (commentWithRateResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(commentWithRateResponseDTOS);
    }

    @PutMapping
    public ResponseEntity<CommentWithRateResponseDTO> addComment(@Valid @RequestBody CommentWithRateAddDTO commentWithRateAddDTO) {
        return ResponseEntity.ok().body(commentService.addCommentWithRate(commentWithRateAddDTO));
    }
}
