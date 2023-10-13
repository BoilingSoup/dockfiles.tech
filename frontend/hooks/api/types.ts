export type CommentResponse = {
  id: number;
  content: string;
  environment_id: number;
  created_at: string;
  is_deleted: boolean;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
};
