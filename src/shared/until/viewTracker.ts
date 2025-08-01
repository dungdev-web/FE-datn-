// utils/viewTracker.ts
export const getLocalViews = (postId: number): number => {
  const views = localStorage.getItem(`blog_views_${postId}`);
  return views ? parseInt(views, 10) : 0;
};

export const increaseLocalViews = (postId: number): number => {
  const currentViews = getLocalViews(postId);
  const newViews = currentViews + 1;
  localStorage.setItem(`blog_views_${postId}`, newViews.toString());
  return newViews;
};
