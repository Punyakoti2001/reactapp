package com.zettamine.login.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.zettamine.login.entities.Users;

@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {

	Optional<Users> findByEmail(String email);

	Optional<Users> findByEmailAndTempPwd(String userName, String password);

	Optional<Users> findByEmailAndPassword(String userName, String password);

}
