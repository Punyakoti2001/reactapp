package com.zettamine.login.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Entity
@Setter
@Getter
@RequiredArgsConstructor
@Table(uniqueConstraints = @UniqueConstraint(columnNames = "email"))
public class Users 
{
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE ,generator = "userId")
	@SequenceGenerator(name = "userId",allocationSize = 1,initialValue = 1000)
	private Integer userId;
	private String firstName;

	private String email;
	private String password;
	private String tempPwd;
	private String lastName;
	private Integer loginStatus;
	private boolean accountLock;
	private Integer attempts;
	
//	@ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
	@ManyToOne(cascade = CascadeType.PERSIST)
	private Roles roles;
}
