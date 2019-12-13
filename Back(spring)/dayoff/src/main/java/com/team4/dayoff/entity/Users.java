package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamicInsert
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
	
	@ColumnDefault("0")
	private Integer accrue;
	
	@ManyToOne
	@JoinColumn(name="level")
    @ColumnDefault("브론즈")
	private Grade grade;

	@ColumnDefault("user")
	private String role;
	
    @Temporal(TemporalType.TIMESTAMP)
	private Date signUpDate;
	
    private String accessToken;
	private String refreshToken;
	
	@ColumnDefault("0")
    private Integer totalEmoney;
    
	
    
}