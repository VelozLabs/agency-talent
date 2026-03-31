# Contributing Guidelines for New Talents

Thank you for your interest in contributing to the Agency Talent project! Please follow the guidelines below to ensure a smooth process for submission.

## Required Directory Structure

When submitting new talents, please adhere to the following directory structure:

```
/talents/
    ├── profile.yaml
    ├── skills/
    │   └── core.md
    └��─ tools/
        └── manifest.yaml
```

### Description of Each File:
- **profile.yaml**: This file should contain all necessary information about the talent, including name, experience, and contact information.
- **skills/core.md**: In this file, outline the core skills of the talent, focusing on their key competencies and areas of expertise.
- **tools/manifest.yaml**: This manifest should list any tools or technologies the talent is proficient in, with relevant details.

## Naming Conventions

- Use kebab-case for filenames (e.g., `john-doe.yaml`, `python-developer.md`).
- Ensure that the names are descriptive, reflecting the talent's profile.

## Category Organization

Please categorize talents based on their primary skill set and roles. Common categories include but are not limited to:
- Software Development
- Design
- Marketing
- Data Science

Organize submitted files accordingly in the relevant directories.

## Template for New Talent Submissions

When submitting a new talent, please use the following template:

### profile.yaml
```yaml
name: ""
contact:
    email: ""
    phone: ""
experience: ""
```

### skills/core.md
```
# Core Skills
- Skill 1
- Skill 2
- Skill 3
```

### tools/manifest.yaml
```yaml
tools:
  - name: ""
    version: ""
```

## Submitting Your Contributions

Once you’ve organized your files following the structure and conventions outlined, please create a pull request for review. Thank you for your contributions!