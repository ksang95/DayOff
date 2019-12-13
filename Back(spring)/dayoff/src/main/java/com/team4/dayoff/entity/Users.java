package com.team4.dayoff.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Users {
	@Id
	@GeneratedValue
	private int id;
	
	private String social_Id;
    private String name;
    private Date birth;
    private String sex;
    private String height;
    private String weight;
    private int phone;
    private int accrue;
    private String level;
    private String role;
    private Date sign_Up_Date;
    private String access_Token;
    private String refresh_Token;
    private int total_Emoney;
    
    
	public Users() {
		super();
	}
	
	public Users(int id, String social_Id, String name, Date birth, String sex, String height, String weight, int phone,
			int accrue, String level, String role, Date sign_Up_Date, String access_Token, String refresh_Token,
			int total_Emoney) {
		super();
		this.id = id;
		this.social_Id = social_Id;
		this.name = name;
		this.birth = birth;
		this.sex = sex;
		this.height = height;
		this.weight = weight;
		this.phone = phone;
		this.accrue = accrue;
		this.level = level;
		this.role = role;
		this.sign_Up_Date = sign_Up_Date;
		this.access_Token = access_Token;
		this.refresh_Token = refresh_Token;
		this.total_Emoney = total_Emoney;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getSocial_Id() {
		return social_Id;
	}
	public void setSocial_Id(String social_Id) {
		this.social_Id = social_Id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getBirth() {
		return birth;
	}
	public void setBirth(Date birth) {
		this.birth = birth;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWeight() {
		return weight;
	}
	public void setWeight(String weight) {
		this.weight = weight;
	}
	public int getPhone() {
		return phone;
	}
	public void setPhone(int phone) {
		this.phone = phone;
	}
	public int getAccrue() {
		return accrue;
	}
	public void setAccrue(int accrue) {
		this.accrue = accrue;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Date getSign_Up_Date() {
		return sign_Up_Date;
	}
	public void setSign_Up_Date(Date sign_Up_Date) {
		this.sign_Up_Date = sign_Up_Date;
	}
	public String getAccess_Token() {
		return access_Token;
	}
	public void setAccess_Token(String access_Token) {
		this.access_Token = access_Token;
	}
	public String getRefresh_Token() {
		return refresh_Token;
	}
	public void setRefresh_Token(String refresh_Token) {
		this.refresh_Token = refresh_Token;
	}
	public int getTotal_Emoney() {
		return total_Emoney;
	}
	public void setTotal_Emoney(int total_Emoney) {
		this.total_Emoney = total_Emoney;
	}
	@Override
	public String toString() {
		return "Users [id=" + id + ", social_Id=" + social_Id + ", name=" + name + ", birth=" + birth + ", sex=" + sex
				+ ", height=" + height + ", weight=" + weight + ", phone=" + phone + ", accrue=" + accrue + ", level="
				+ level + ", role=" + role + ", sign_Up_Date=" + sign_Up_Date + ", access_Token=" + access_Token
				+ ", refresh_Token=" + refresh_Token + ", total_Emoney=" + total_Emoney + "]";
	}
	
    
}