export type MemoryCategory =
  | 'project_fact'
  | 'decision'
  | 'bug_fix'
  | 'failed_attempt'
  | 'preference'
  | 'workflow';

export interface MemoryRecord {
  id: string;
  projectPath: string;
  category: MemoryCategory;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
