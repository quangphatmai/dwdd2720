import React from "react";
import { ProjectCard, TaskCard, MemberCard } from "../components/EntityCard";
import type { Entity } from "../domain/entities";
import { isProject, isTask, isTeamMember } from "../domain/guards";

export type { Entity };

export function renderEntityCard(entity: Entity): React.ReactNode {
  if (isProject(entity)) {
    return React.createElement(ProjectCard, { key: entity.id, entity });
  }
  if (isTask(entity)) {
    return React.createElement(TaskCard, { key: entity.id, entity });
  }
  if (isTeamMember(entity)) {
    return React.createElement(MemberCard, { key: entity.id, entity });
  }
  const _exhaustiveCheck: never = entity;
  return _exhaustiveCheck;
}
