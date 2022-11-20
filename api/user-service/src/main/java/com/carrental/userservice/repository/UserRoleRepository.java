package com.carrental.userservice.repository;

import com.carrental.userservice.model.entity.UserRoleEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface UserRoleRepository extends PagingAndSortingRepository<UserRoleEntity, Long> {

    Set<UserRoleEntity> findAll();

    Optional<UserRoleEntity> findByType(String type);

    @Query("SELECT ur FROM user_roles ur WHERE ur.id NOT IN (" +
            "SELECT urs.id FROM users u " +
                "JOIN u.roles urs " +
                "WHERE u.id=:userId" +
            ")")
    Set<UserRoleEntity> getAllUserRolesNotAssignedToUser(@Param("userId") Long userId);
}
