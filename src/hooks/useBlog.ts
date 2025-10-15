import { useState, useEffect } from 'react';
import { BlogService } from '../services/supabase';
import type { BlogPost } from '../types/database';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const data = await BlogService.getAll({ status: 'published' });
        setPosts(data || []);
      } catch (err) {
        setError('Failed to fetch blog posts');
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(id: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // Note: This would need a getById method in BlogService
        // For now, we'll fetch all and find by id
        const posts = await BlogService.getAll({ status: 'published' });
        const data = posts?.find(p => p.id === id) || null;
        setPost(data);
      } catch (err) {
        setError('Failed to fetch blog post');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  return { post, loading, error };
}

export function useBlogPostBySlug(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        const data = await BlogService.getBySlug(slug);
        setPost(data);
      } catch (err) {
        setError('Failed to fetch blog post');
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [slug]);

  return { post, loading, error };
}