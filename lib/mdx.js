import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), "posts");
const projectsDirectory = path.join(process.cwd(), "projects");

// Blog Posts Logic

export function getPostSlugs() {
    return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug) {
    const fullPath = path.join(postsDirectory, `${slug}`);
    console.log(fullPath);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { data, content };
}

export async function getAllPosts() {
    const slugs = getPostSlugs();

    const posts = slugs.map((slug) => {
        const { data } = getPostBySlug(slug);
        return {
            slug: slug.replace(/\.mdx$/, ''),
            frontMatter: data,
        }
    });

    return posts;
}

// Project Handlers

export function getProjectSlugs() {
    if (!fs.existsSync(projectsDirectory)) return [];
    return fs.readdirSync(projectsDirectory).filter(file => file.endsWith('.md'));
}

export function getProjectBySlug(fileWithExtension) {
    const fullPath = path.join(projectsDirectory, fileWithExtension);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug: data.slug || fileWithExtension.replace(/\.md$/, ''),
        title: data.title || "Untitled Project",
        description: data.description || "",
        image: data.image || "/assets/img/placeholder.webp",
        tags: data.tags || [],
        link: data.link || "#",
        github: data.github,
        itch: data.itch,
        type: data.type || "web",
        startDate: data.startDate || "",
        endDate: data.endDate,
        ongoing: data.ongoing ?? false,
        content: content,
        isCommercial: data.isCommercial ?? false, 
        access: data.access || "public",            
        impact: data.impact || ""
    };
}

export function getAllProjects() {
    const filenames = getProjectSlugs();

    const projects = filenames.map((filename) => {
        return getProjectBySlug(filename);
    });

    // sort chronologically (newest->oldest)
    return projects.sort((a, b) => {
        const timeA = a.ongoing ? Date.now() : new Date(a.endDate || a.startDate).getDate();
        const timeB = b.ongoing ? Date.now() : new Date(b.endDate || b.startDate).getDate();
        return timeB - timeA;
    });
}

