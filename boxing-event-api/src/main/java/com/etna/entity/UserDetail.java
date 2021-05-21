package com.etna.entity;

import com.google.gson.Gson;
import com.etna.utils.validation.groups.OnCreate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Null;

@Entity
@Table(name = "user_detail")
public class UserDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = OnCreate.class)
    private Integer id;

    @Column(name = "height", nullable = false)
    private double height;

    @Column(name = "weight", nullable = false)
    private double weight;

    public UserDetail(String data) {
        UserDetail tmp = new Gson().fromJson(data, UserDetail.class);
        this.height = tmp.getHeight();
        this.weight = tmp.getWeight();
    }

    public UserDetail() {
    }

    @Override
    public String toString() {
        return "{" +
                "\"height\":" + height +
                ", \"weight\":" + weight +
                '}';
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public double getHeight() {
        return height;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

}
