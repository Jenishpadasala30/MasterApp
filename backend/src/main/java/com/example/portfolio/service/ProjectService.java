package com.example.portfolio.service;

import com.example.portfolio.model.Project;
import com.example.portfolio.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;

	public List<Project> getAllProjects() {
		return projectRepository.findAll();
	}

	public Optional<Project> getProjectById(Long id) {
		return projectRepository.findById(id);
	}

	public Project createProject(Project project) {
		return projectRepository.save(project);
	}

	public Project updateProject(Long id, Project projectDetails) {
		Project project = projectRepository.findById(id)
			.orElseThrow(() -> new RuntimeException("Project not found with id: " + id));

		project.setTitle(projectDetails.getTitle());
		project.setDescription(projectDetails.getDescription());
		project.setTechnologies(projectDetails.getTechnologies());
		project.setGithubUrl(projectDetails.getGithubUrl());
		project.setImageUrl(projectDetails.getImageUrl());

		return projectRepository.save(project);
	}

	public void deleteProject(Long id) {
		projectRepository.deleteById(id);
	}
}

