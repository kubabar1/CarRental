package com.carrental.ratingservice.controller;

import com.carrental.ratingservice.model.dto.CommentAddDTO;
import com.carrental.ratingservice.model.dto.CommentResponseDTO;
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
    public ResponseEntity<Set<CommentResponseDTO>> getCommentsController() {
        Set<CommentResponseDTO> commentResponseDTOS = commentService.getComments();
        if (commentResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(commentResponseDTOS);
    }

    @GetMapping(value = "/vehicle/{vehicleId}")
    public ResponseEntity<Page<CommentResponseDTO>> getCommentByVehicleIdController(@PathVariable(value = "vehicleId") Long vehicleId, Pageable pageable) {
        Page<CommentResponseDTO> commentResponseDTOPage;
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
    public ResponseEntity<Set<CommentResponseDTO>> getCommentByUserIdController(@PathVariable(value = "userId") Long userId) {
        Set<CommentResponseDTO> commentResponseDTOS;
        try {
            commentResponseDTOS = commentService.getCommentsByUserId(userId);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        if (commentResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(commentResponseDTOS);
    }

    @PutMapping
    public ResponseEntity<CommentResponseDTO> getCommentByUserIdController(@Valid @RequestBody CommentAddDTO commentAddDTO) {
        return ResponseEntity.ok().body(commentService.addComment(commentAddDTO));
    }
}
