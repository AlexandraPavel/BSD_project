package com.project.user.administration.repository;

import java.util.List;

import com.project.user.administration.model.PieSliceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PieSliceRepository extends JpaRepository<PieSliceModel, Long> {

    public PieSliceModel findPieSliceModelByPieSliceId(Long pieSliceId);

    @Query("SELECT p FROM PieSliceModel p WHERE p.userId = ?1 AND p.pieName = ?2")
    public List<PieSliceModel> findAllByUserIdAndPieName(Long userId, String pieName);

    @Query("SELECT p FROM PieSliceModel p WHERE p.pieName = ?1")
    public List<PieSliceModel> findAllByPieName(String pieName);

    public List<PieSliceModel> findAllByUserId(Long userId);
}
