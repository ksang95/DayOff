package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class Users {
	@Id
	@GeneratedValue
	private Integer id;
	
	private String socialId;
    private String name;
    private Date birth;
    private String sex;
    private String height;
    private String weight;
    private Integer phone;
	private Integer accrue;
	
	@ManyToOne
	@JoinColumn(name="level")
	private Grade grade;

    private String role;
    private Date signUpDate;
    private String accessToken;
    private String refreshToken;
    private Integer totalEmoney;
    
	
    
}