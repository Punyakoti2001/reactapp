package com.zettamine.login.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zettamine.login.entities.Roles;

public interface RolesRepository extends JpaRepository<Roles,Integer> {

}
