package com.example.portfolio.controller;

import com.example.portfolio.model.Project;
import com.example.portfolio.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = { "http://localhost:3000", "http://localhost:3001", "http://frontend:3000" })
public class ProjectController {

	@Autowired
	private ProjectService projectService;

	@GetMapping
	public ResponseEntity<List<Project>> getAllProjects() {
		List<Project> projects = projectService.getAllProjects();
		return ResponseEntity.ok(projects);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
		return projectService.getProjectById(id)
				.map(project -> ResponseEntity.ok(project))
				.orElse(ResponseEntity.notFound().build());
	}

	@PostMapping
	public ResponseEntity<Project> createProject(@RequestBody Project project) {
		Project createdProject = projectService.createProject(project);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project project) {
		try {
			Project updatedProject = projectService.updateProject(id, project);
			return ResponseEntity.ok(updatedProject);
		} catch (RuntimeException e) {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
		projectService.deleteProject(id);
		return ResponseEntity.noContent().build();
	}
}
