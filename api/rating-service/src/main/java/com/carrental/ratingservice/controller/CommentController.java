package com.carrental.ratingservice.controller;

import com.carrental.ratingservice.model.dto.CommentWithRateAddDTO;
import com.carrental.ratingservice.model.dto.CommentWithRateResponseDTO;
import com.carrental.ratingservice.service.CommentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;

@CrossOrigin
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
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

    @PutMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CommentWithRateResponseDTO> addComment(@Valid @RequestBody CommentWithRateAddDTO commentWithRateAddDTO) {
        return ResponseEntity.ok().body(commentService.addCommentWithRate(commentWithRateAddDTO));
    }
}
