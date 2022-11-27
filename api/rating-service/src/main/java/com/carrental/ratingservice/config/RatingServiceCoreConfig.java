package com.carrental.ratingservice.config;

import com.carrental.ratingservice.controller.CommentController;
import com.carrental.ratingservice.listener.VehicleRatingListener;
import com.carrental.ratingservice.repository.CommentRepository;
import com.carrental.ratingservice.repository.RateRepository;
import com.carrental.ratingservice.service.CommentService;
import com.carrental.ratingservice.service.RateService;
import com.carrental.ratingservice.service.impl.CommentServiceImpl;
import com.carrental.ratingservice.service.impl.RateServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;

public class RatingServiceCoreConfig {

    @Bean
    public RateService rateService(RateRepository rateRepository) {
        return new RateServiceImpl(rateRepository);
    }

    @Bean
    public CommentService commentService(CommentRepository commentRepository, ModelMapper modelMapper) {
        return new CommentServiceImpl(commentRepository, modelMapper);
    }

    @Bean
    public CommentController commentController(CommentService commentService) {
        return new CommentController(commentService);
    }

    @Bean
    public VehicleRatingListener vehicleRatingListener(RateService rateService) {
        return new VehicleRatingListener(rateService);
    }
}
