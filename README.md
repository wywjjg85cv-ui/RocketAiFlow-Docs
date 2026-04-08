# RocketAiFlowDocs

Standalone Nextra documentation project for RocketAiFlow.

## Purpose

This project is meant to be deployed separately from the marketing website, typically behind a dedicated docs hostname such as `doc.rocketaiflow.com` or another load-balanced subdomain.

The docs app is documentation-first:
- product education
- technical evaluation support
- onboarding support
- deployment and provider guidance

## Local development

```bash
npm install
npm run dev
```

The app serves documentation from the root route of the docs domain.

## Docker

```bash
docker compose up --build
```

Local container port mapping:
- docs app: `http://localhost:3001`

## ECR Release Workflow

This project includes a GitHub Actions workflow at `.github/workflows/docker-ecr-release.yml`.

Required repository variables:
- `AWS_REGION`
- `ECR_REPOSITORY`
- `AWS_ROLE_TO_ASSUME`

Release triggers:
- push a tag like `v1.0.0`
- or run the workflow manually with `image_tag`

## Notes

- Detailed provider-specific information should stay in docs pages, not the marketing homepage.
- The content structure is ready for future multilingual expansion through Nextra page organization.
