package com.etna.entity;

import com.etna.utils.validation.groups.OnCreate;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.Null;
import java.util.Calendar;

@Entity
@Table(name = "fight")
public class Fight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Null(groups = OnCreate.class)
    private int id;

    private User opponentA;

    private User opponentB;

    private Calendar dateStart;

    private Calendar dateEnd;

    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private Calendar createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private Calendar updatedAt;

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public User getOpponentA() {
        return opponentA;
    }

    public void setOpponentA(User opponentA) {
        this.opponentA = opponentA;
    }

    public User getOpponentB() {
        return opponentB;
    }

    public void setOpponentB(User opponentB) {
        this.opponentB = opponentB;
    }

    public Calendar getDateStart() {
        return dateStart;
    }

    public void setDateStart(Calendar dateStart) {
        this.dateStart = dateStart;
    }

    public Calendar getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(Calendar dateEnd) {
        this.dateEnd = dateEnd;
    }

    public Calendar getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Calendar createdAt) {
        this.createdAt = createdAt;
    }

    public Calendar getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Calendar updatedAt) {
        this.updatedAt = updatedAt;
    }
}
