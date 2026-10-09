import { Navigate, Route, Routes, Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./App.css";
import "./theme.css";
const workflowItems = [
    {
        number: "01",
        title: "Create Project",
        description:
            "Initialize a workspace, define project goals, and set target milestones.",
        label: "Workspace Ready",
        icon: "▣",
    },
    {
        number: "02",
        title: "Build Your Team",
        description:
            "Invite developers, assign roles, and distribute project responsibilities.",
        label: "Team Management",
        icon: "♧",
    },
    {
        number: "03",
        title: "Create & Assign Issues",
        description:
            "Draft issue tickets with priorities, descriptions, deadlines, and assignees.",
        label: "Issue Triage",
        icon: "◇",
    },
    {
        number: "04",
        title: "Track Progress",
        description:
            "Monitor issue completion, comments, assignments, and project progress.",
        label: "Progress Tracking",
        icon: "◔",
    },
    {
        number: "05",
        title: "Ship",
        description:
            "Complete assigned work, review progress, and move projects toward completion.",
        label: "Milestone Release",
        icon: "↗",
    },
];
const featureItems = [
    {
        title: "Project Management",
        description:
            "Organize development projects and track progress across your workspaces.",
        metric: "Project Progress",
        value: "75%",
        icon: "▣",
        accent: "blue",
    },
    {
        title: "Issue Tracking",
        description:
            "Create, prioritize, assign, and resolve development issues from one workspace.",
        metric: "Issue Workflow",
        value: "Linear Flow",
        icon: "✓",
        accent: "red",
    },
    {
        title: "Team Collaboration",
        description:
            "Manage team members, assignments, roles, and shared issue discussions.",
        metric: "Active Workload",
        value: "Balanced",
        icon: "♧",
        accent: "green",
    },
    {
        title: "Developer Intelligence",
        description:
            "Use project context to understand progress, issues, assignments, and workflow.",
        metric: "DevTrack Agent",
        value: "Contextual",
        icon: "◆",
        accent: "purple",
    },
];
function ThemeToggle({ theme, onToggle }) {
    const isDark = theme === "dark";
    return (
        <button
            type="button"
            className="theme-toggle"
            onClick={onToggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span className="theme-toggle-icon" aria-hidden="true">
                {isDark ? "☀" : "☾"}
            </span>
            <span className="theme-toggle-label">
                {isDark ? "Light" : "Dark"}
            </span>
        </button>
    );
}
function LandingPage({ theme, onToggleTheme }) {
    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 25,
    });
    const handlePointerMove = (event) => {
        if (!event.isPrimary) {
            return;
        }
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setMousePosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };
    const handlePointerLeave = (event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
            setMousePosition({
                x: 50,
                y: 25,
            });
        }
    };
    useEffect(() => {
        const revealTargets = document.querySelectorAll(
            ".landing-page .section-block, " +
                ".landing-page .agent-section, " +
                ".landing-page .about-section, " +
                ".landing-page .final-cta, " +
                ".landing-page .feature-card, " +
                ".landing-page .workflow-card, " +
                ".landing-page .about-card, " +
                ".landing-page .agent-panel"
        );
        revealTargets.forEach((element, index) => {
            element.classList.add("reveal-on-scroll");
            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(index * 45, 280)}ms`
            );
        });
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px",
            }
        );
        revealTargets.forEach((element) => observer.observe(element));
        return () => {
            observer.disconnect();
        };
    }, []);
    return (
        <main
            className="landing-page"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
                "--mouse-x": `${mousePosition.x}%`,
                "--mouse-y": `${mousePosition.y}%`,
            }}
        >
            <div className="landing-grid" />
            <header className="landing-header">
                <Link to="/" className="brand">
                    <span className="brand-mark" aria-hidden="true">
                        <span />
                        <span />
                        <span />
                    </span>
                    <span className="brand-name">DevTrack</span>
                    <span className="brand-version">v1.0</span>
                </Link>
                <nav className="landing-nav" aria-label="Main navigation">
                    <a href="#product">Product</a>
                    <a href="#features">Features</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#agent">DevTrack Agent</a>
                    <a href="#about">About Us</a>
                </nav>
                <div className="header-actions">
                    <ThemeToggle
                        theme={theme}
                        onToggle={onToggleTheme}
                    />
                    <Link to="/login" className="nav-signin">
                        Sign In
                    </Link>
                    <Link to="/register" className="nav-cta">
                        Get Started
                        <span>→</span>
                    </Link>
                </div>
            </header>
            <section id="product" className="hero-section">
                <div className="hero-copy">
                    <div className="eyebrow">
                        <span className="status-dot" />
                        DEVTRACK · DEVELOPER WORKFLOW
                    </div>
                    <div className="hero-label">
                        FOR ENGINEERS, TECH LEADS & SQUADS
                    </div>
                    <h1>
                        Build.
                        <br />
                        <span>Track.</span>
                        <br />
                        Ship.
                    </h1>
                    <p className="hero-description">
                        DevTrack is a developer-focused project and issue
                        management platform that helps teams organize projects,
                        manage issues, assign work, collaborate through comments,
                        and monitor project progress from one workspace.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="primary-button">
                            Get Started
                            <span>→</span>
                        </Link>
                        <a href="#features" className="secondary-button">
                            Explore DevTrack
                            <span>↘</span>
                        </a>
                    </div>
                    <div className="hero-highlights">
                        <div>
                            <strong>Workspaces</strong>
                            <span>Organized by project</span>
                        </div>
                        <div>
                            <strong>Sprint Tracking</strong>
                            <span>Issue milestone progress</span>
                        </div>
                        <div>
                            <strong>Contextual Agent</strong>
                            <span>Project-aware assistance</span>
                        </div>
                    </div>
                </div>
                <div className="hero-workspace">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span />
                                <span />
                                <span />
                            </div>
                            <span className="terminal-title">
                                devtrack · workspace
                            </span>
                            <span className="terminal-status">
                                WORKSPACE SYNC
                            </span>
                        </div>
                        <div className="workspace-header">
                            <div>
                                <span className="workspace-kicker">
                                    Sprint 14 — Core Platform & Issues
                                </span>
                                <div className="workspace-stats">
                                    <span>12 Open</span>
                                    <span>36 Closed</span>
                                    <span>2 Blocked</span>
                                </div>
                            </div>
                            <span className="completion-badge">
                                75% Done
                            </span>
                        </div>
                        <div className="pipeline-title">
                            <span>PIPELINE EXECUTION</span>
                            <span>SPRINT 14</span>
                        </div>
                        <div className="pipeline">
                            <div className="pipeline-card">
                                <span className="issue-id">DT-1842</span>
                                <strong>OAuth PKCE Login</strong>
                                <small>● Alex R.</small>
                            </div>
                            <div className="pipeline-card active">
                                <span className="issue-id">DT-1845</span>
                                <strong>WebSocket Member Roles</strong>
                                <small>● Sara C.</small>
                            </div>
                            <div className="pipeline-card review">
                                <span className="issue-id">DT-1849</span>
                                <strong>Issue Triage & Assignment</strong>
                                <small>● In Review</small>
                            </div>
                        </div>
                        <div className="terminal-line">
                            <span>›</span>
                            <span>
                                devtrack-agent: "Sprint 14 overview: 12 open
                                issues, 36 closed, 2 issues ready for review."
                            </span>
                        </div>
                        <div className="workspace-footer">
                            <div className="agent-pill">
                                <span className="agent-avatar">◆</span>
                                <div>
                                    <strong>Active Sprint 14</strong>
                                    <small>Milestone Tracking</small>
                                </div>
                            </div>
                            <span className="interactive-label">
                                Interactive Workspace
                            </span>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="section-block">
                <div className="section-heading">
                    <div className="section-tag">
                        DEVELOPER WORKFLOWS
                    </div>
                    <h2>
                        Everything your software team needs
                        <br />
                        to ship on schedule.
                    </h2>
                    <p>
                        Consolidate your team workflow. DevTrack brings
                        together project organization, issue assignments,
                        comments, and progress tracking in one workspace.
                    </p>
                </div>
                <div className="feature-grid">
                    {featureItems.map((feature) => (
                        <article
                            className={`feature-card ${feature.accent}`}
                            key={feature.title}
                        >
                            <div className="feature-icon">
                                {feature.icon}
                            </div>
                            <div className="feature-topline">
                                <h3>{feature.title}</h3>
                                <span>{feature.metric}</span>
                            </div>
                            <p>{feature.description}</p>
                            <div className="feature-preview">
                                <div className="preview-header">
                                    <span>{feature.metric}</span>
                                    <strong>{feature.value}</strong>
                                </div>
                                <div className="preview-line">
                                    <span />
                                </div>
                                <div className="preview-meta">
                                    <span>DevTrack workspace</span>
                                    <span>Live workflow</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <section
                id="how-it-works"
                className="section-block workflow-section"
            >
                <div className="section-heading">
                    <div className="section-tag green-tag">
                        SIMPLE WORKFLOW
                    </div>
                    <h2>
                        How It Works: From Concept to Production
                    </h2>
                    <p>
                        A clear workflow designed to take development teams
                        from initial project setup to completed work.
                    </p>
                </div>
                <div className="workflow-grid">
                    {workflowItems.map((item) => (
                        <article
                            className="workflow-card"
                            key={item.number}
                        >
                            <div className="workflow-number">
                                {item.number}
                            </div>
                            <div className="workflow-icon">
                                {item.icon}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                            <span>{item.label}</span>
                        </article>
                    ))}
                </div>
            </section>
            <section id="agent" className="agent-section">
                <div className="agent-copy">
                    <div className="section-tag cyan-tag">
                        ● CONTEXTUAL ASSISTANT · DEVTRACK AGENT
                    </div>
                    <h2>
                        An integrated project assistant
                        <br />
                        embedded directly inside your workspace.
                    </h2>
                    <p>
                        DevTrack Agent is designed to work with project
                        context, helping developers understand sprint
                        progress, review issue status, identify blockers,
                        and keep development workflows organized.
                    </p>
                    <div className="agent-capabilities">
                        <span>
                            Summarize sprint milestones & status
                        </span>
                        <span>
                            Track project deadlines and blockers
                        </span>
                        <span>
                            Understand issue assignments
                        </span>
                        <span>
                            Provide contextual workflow assistance
                        </span>
                    </div>
                    <Link to="/dashboard" className="primary-button">
                        Explore DevTrack Agent
                        <span>→</span>
                    </Link>
                </div>
                <div className="agent-panel">
                    <div className="agent-panel-header">
                        <div className="agent-identity">
                            <span className="agent-logo">◆</span>
                            <div>
                                <strong>DevTrack Agent</strong>
                                <small>● Ready · Contextual</small>
                            </div>
                        </div>
                        <span>AI CORE</span>
                    </div>
                    <div className="suggested-title">
                        Suggested Prompts
                    </div>
                    <div className="prompt-card">
                        Summary of blockers across the current project
                    </div>
                    <div className="prompt-card">
                        Sprint progress and milestone overview
                    </div>
                    <div className="prompt-card">
                        Review unassigned issues and current workload
                    </div>
                    <div className="agent-analysis">
                        <span>Analysis:</span> Project context available.
                        Suggested workflow actions can be surfaced from the
                        workspace.
                    </div>
                </div>
            </section>
            <section id="about" className="about-section">
                <div className="section-heading">
                    <div className="section-tag blue-tag">
                        ABOUT DEVTRACK
                    </div>
                    <h2>Built for developers, by developers.</h2>
                    <p>
                        DevTrack brings project management and development
                        workflow into one focused workspace—without adding
                        unnecessary complexity.
                    </p>
                </div>
                <div className="about-grid">
                    <div className="about-card">
                        <span className="about-number">01</span>
                        <h3>Organize</h3>
                        <p>
                            Keep projects, team members, issues, assignments,
                            and progress connected in one place.
                        </p>
                    </div>
                    <div className="about-card">
                        <span className="about-number">02</span>
                        <h3>Collaborate</h3>
                        <p>
                            Give teams a shared workspace for assignments,
                            comments, issue discussions, and project progress.
                        </p>
                    </div>
                    <div className="about-card">
                        <span className="about-number">03</span>
                        <h3>Ship</h3>
                        <p>
                            Turn project work into a clear workflow from
                            creation through issue resolution and completion.
                        </p>
                    </div>
                </div>
            </section>
            <section className="final-cta">
                <div className="section-tag">
                    DEVELOPER EXPERIENCE REFINED
                </div>
                <h2>
                    Ready to take control of your development workflow?
                </h2>
                <p>
                    Bring your development workflow into one workspace.
                </p>
                <div className="hero-actions centered">
                    <Link to="/register" className="primary-button">
                        Get Started
                        <span>→</span>
                    </Link>
                    <Link to="/login" className="secondary-button">
                        Sign In
                        <span>↗</span>
                    </Link>
                </div>
            </section>
            <footer className="landing-footer">
                <div className="footer-brand">
                    <Link to="/" className="brand">
                        <span className="brand-mark" aria-hidden="true">
                            <span />
                            <span />
                            <span />
                        </span>
                        <span className="brand-name">DevTrack</span>
                    </Link>
                    <p>
                        Developer-focused project and issue management for
                        modern software teams.
                    </p>
                    <span className="operational">
                        <span />
                        All systems operational
                    </span>
                </div>
                <div className="footer-column">
                    <h4>PRODUCT</h4>
                    <a href="#features">Project Management</a>
                    <a href="#features">Issue Tracking</a>
                    <a href="#features">Team Collaboration</a>
                    <a href="#agent">DevTrack Agent</a>
                </div>
                <div className="footer-column">
                    <h4>WORKSPACE</h4>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/issues">Issues</Link>
                    <Link to="/team">Team</Link>
                </div>
                <div className="footer-column">
                    <h4>ACCOUNT</h4>
                    <Link to="/login">Sign In</Link>
                    <Link to="/register">Create Account</Link>
                    <Link to="/settings">Settings</Link>
                </div>
                <div className="footer-bottom">
                    <span>
                        © 2026 DevTrack. Developer workflow platform.
                    </span>
                    <span>
                        Built for focused development teams.
                    </span>
                </div>
            </footer>
        </main>
    );
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const appNavItems = [
    { label: "Dashboard", path: "/dashboard", icon: "▦" },
    { label: "Projects", path: "/projects", icon: "▣" },
    { label: "Issues", path: "/issues", icon: "◇" },
    { label: "Team", path: "/team", icon: "♧" },
    { label: "Settings", path: "/settings", icon: "⚙" },
];
const demoProjects = [
    {
        _id: "demo-1",
        name: "Developer CLI & Toolkit",
        description: "Build a developer productivity toolkit with automation, issue tracking, and release workflows.",
        status: "active",
        members: [],
    },
    {
        _id: "demo-2",
        name: "Distributed Telemetry Engine",
        description: "High-throughput telemetry and observability platform for modern engineering teams.",
        status: "active",
        members: [],
    },
    {
        _id: "demo-3",
        name: "Authentication & Zero-Trust Gateway",
        description: "Secure authentication workflows, role management, and service access controls.",
        status: "completed",
        members: [],
    },
];
const demoIssues = [
    { _id: "demo-i1", title: "Implement OAuth PKCE callback handler and token refresh pipeline", status: "in-progress", priority: "critical", project: { name: "Developer CLI & Toolkit" } },
    { _id: "demo-i2", title: "Fix memory leak in WebSocket connection pool", status: "open", priority: "high", project: { name: "Distributed Telemetry Engine" } },
    { _id: "demo-i3", title: "Design dark-mode navigation states", status: "resolved", priority: "medium", project: { name: "Web App Next-Gen Client" } },
    { _id: "demo-i4", title: "Implement bidirectional gRPC packet filter for edge agents", status: "in-progress", priority: "high", project: { name: "Telemetry Engine" } },
];
const demoMembers = [
    { id: "demo-u1", name: "Alex Rivera", email: "alex@devtrack.local", role: "developer" },
    { id: "demo-u2", name: "Sara Chen", email: "sara@devtrack.local", role: "developer" },
    { id: "demo-u3", name: "Elena Rodriguez", email: "elena@devtrack.local", role: "developer" },
    { id: "demo-u4", name: "Marcus Vance", email: "marcus@devtrack.local", role: "developer" },
    { id: "demo-u5", name: "Jordan Lee", email: "jordan@devtrack.local", role: "developer" },
];
function getStoredAuth() {
    try {
        return {
            token: localStorage.getItem("devtrack-token"),
            user: JSON.parse(localStorage.getItem("devtrack-user") || "null"),
        };
    } catch {
        return { token: null, user: null };
    }
}
function saveAuth(token, user) {
    localStorage.setItem("devtrack-token", token);
    localStorage.setItem("devtrack-user", JSON.stringify(user || null));
}
function clearAuth() {
    localStorage.removeItem("devtrack-token");
    localStorage.removeItem("devtrack-user");
}
async function apiRequest(path, options = {}) {
    const { token } = getStoredAuth();
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });
    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
        ? await response.json()
        : await response.text();
    if (!response.ok) {
        const message = typeof data === "object" && data?.message
            ? data.message
            : "The request could not be completed.";
        throw new Error(message);
    }
    return data;
}
function DevTrackMark() {
    return (
        <span className="brand-mark" aria-hidden="true">
            <span />
            <span />
            <span />
        </span>
    );
}
function AppShell({ theme, onToggleTheme, title, eyebrow, children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [pointer, setPointer] = useState({ x: 50, y: 18 });
    const [search, setSearch] = useState("");
    const { user } = getStoredAuth();
    const handlePointerMove = (event) => {
        if (!event.isPrimary) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPointer({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };
    const handleSearch = (event) => {
        event.preventDefault();
        const value = search.trim();
        if (!value) return;
        navigate(`/issues?search=${encodeURIComponent(value)}`);
        setSearch("");
        setMobileOpen(false);
    };
    const handleLogout = () => {
        clearAuth();
        navigate("/login", { replace: true });
    };
    return (
        <div
            className="app-shell"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerMove}
            style={{
                "--app-mouse-x": `${pointer.x}%`,
                "--app-mouse-y": `${pointer.y}%`,
            }}
        >
            <aside className={`app-sidebar ${mobileOpen ? "is-open" : ""}`}>
                <div className="app-sidebar-top">
                    <Link to="/dashboard" className="app-brand" onClick={() => setMobileOpen(false)}>
                        <DevTrackMark />
                        <span className="brand-name">DevTrack</span>
                        <span className="brand-version">v1.0</span>
                    </Link>
                    <div className="workspace-switcher">
                        <span className="workspace-status-dot" />
                        <span>DevTrack Workspace</span>
                        <span className="workspace-status">Live</span>
                    </div>
                </div>
                <nav className="app-sidebar-nav" aria-label="Workspace navigation">
                    <span className="sidebar-label">WORKSPACE</span>
                    {appNavItems.map((item) => {
                        const isActive = location.pathname === item.path || (
                            item.path !== "/dashboard" && location.pathname.startsWith(`${item.path}/`)
                        );
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`sidebar-link ${isActive ? "active" : ""}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                <span className="sidebar-icon" aria-hidden="true">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                    <span className="sidebar-label sidebar-label-agent">INTELLIGENCE</span>
                    <button
                        type="button"
                        className="sidebar-link sidebar-agent-link"
                        onClick={() => {
                            navigate("/dashboard#agent");
                            setMobileOpen(false);
                        }}
                    >
                        <span className="sidebar-icon">◆</span>
                        <span>DevTrack Agent</span>
                        <span className="agent-live-dot" />
                    </button>
                </nav>
                <div className="app-sidebar-bottom">
                    <div className="sidebar-system-status">
                        <span className="system-dot" />
                        <span>All systems operational</span>
                    </div>
                    <button type="button" className="sidebar-logout" onClick={handleLogout}>
                        <span>↪</span>
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>
            {mobileOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    aria-label="Close navigation"
                    onClick={() => setMobileOpen(false)}
                />
            )}
            <div className="app-main">
                <header className="app-topbar">
                    <button
                        type="button"
                        className="mobile-menu-button"
                        onClick={() => setMobileOpen((current) => !current)}
                        aria-label="Toggle navigation"
                    >
                        ☰
                    </button>
                    <form className="app-search" onSubmit={handleSearch}>
                        <span aria-hidden="true">⌕</span>
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Search issues, projects, members..."
                            aria-label="Search DevTrack"
                        />
                        <kbd>⌘ K</kbd>
                    </form>
                    <div className="app-topbar-actions">
                        <button
                            type="button"
                            className="topbar-action-button"
                            title="DevTrack Agent — Coming Soon"
                            aria-label="DevTrack Agent — Coming Soon"
                            disabled
                        >
                            <span>◆</span>
                            DevTrack Agent
                        </button>
                        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                        <button type="button" className="notification-button" title="Notifications">
                            ◌
                            <span className="notification-dot" />
                        </button>
                        <Link to="/settings" className="user-chip" title="Open settings">
                            <span className="user-avatar">{(user?.name || "A").charAt(0).toUpperCase()}</span>
                            <span className="user-chip-copy">
                                <strong>{user?.name || "Developer"}</strong>
                                <small>{user?.role || "developer"}</small>
                            </span>
                        </Link>
                    </div>
                </header>
                <main className="app-content">
                    <div className="app-page-heading">
                        <div>
                            {eyebrow && <span className="app-eyebrow">{eyebrow}</span>}
                            <h1>{title}</h1>
                        </div>
                        <div className="app-page-heading-actions" />
                    </div>
                    {children}
                </main>
            </div>
        </div>
    );
}
function PageState({ loading, error, children, empty, onRetry }) {
    if (loading) {
        return (
            <div className="app-state-card">
                <div className="state-spinner" />
                <strong>Loading DevTrack workspace...</strong>
                <span>Syncing the latest project context.</span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="app-state-card error-state">
                <span className="state-icon">!</span>
                <strong>We couldn't load this workspace.</strong>
                <span>{error}</span>
                {onRetry && <button type="button" className="primary-button" onClick={onRetry}>Retry</button>}
            </div>
        );
    }
    if (empty) {
        return (
            <div className="app-state-card empty-state">
                <span className="state-icon">◇</span>
                <strong>{empty.title}</strong>
                <span>{empty.description}</span>
                {empty.action}
            </div>
        );
    }
    return children;
}
function StatCard({ label, value, meta, tone = "blue", icon = "◈", to }) {
    const content = (
        <>
            <div className="stat-card-topline">
                <span>{label}</span>
                <span className="stat-card-icon">{icon}</span>
            </div>
            <strong>{value}</strong>
            <small>{meta}</small>
        </>
    );

    if (to) {
        return (
            <Link to={to} className={`app-stat-card ${tone} stat-card-link`}>
                {content}
            </Link>
        );
    }

    return <article className={`app-stat-card ${tone}`}>{content}</article>;
}
function StatusBadge({ status }) {
    const label = String(status || "open").replace("-", " ");
    return <span className={`status-badge ${String(status || "open").replace("-", "-")}`}>{label}</span>;
}
function PriorityBadge({ priority }) {
    return <span className={`priority-badge ${priority || "medium"}`}>{priority || "medium"}</span>;
}
function ProgressBar({ value = 0 }) {
    const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
    return (
        <div className="progress-track" aria-label={`${safeValue}% complete`}>
            <span style={{ width: `${safeValue}%` }} />
        </div>
    );
}
function LoginPage({ theme, onToggleTheme }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 25,
    });

    const handlePointerMove = (event) => {
        if (!event.isPrimary) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        setMousePosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    const handlePointerLeave = (event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
            setMousePosition({
                x: 50,
                y: 25,
            });
        }
    };
    const submit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await apiRequest("/users/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });
            saveAuth(data.token, data.user);
            navigate("/dashboard", { replace: true });
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div
            className="auth-page"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
                "--mouse-x": `${mousePosition.x}%`,
                "--mouse-y": `${mousePosition.y}%`,
            }}
        >
            <div className="auth-ambient" />
            <header className="auth-header">
                <Link to="/" className="app-brand">
                    <DevTrackMark />
                    <span className="brand-name">DevTrack</span>
                    <span className="brand-version">v1.0</span>
                </Link>
                <div className="auth-header-actions">
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                    <Link to="/register" className="auth-header-link">Create Account</Link>
                </div>
            </header>
            <div className="auth-layout">
                <section className="auth-card">
                    <div className="auth-card-heading">
                        <span className="app-eyebrow">SECURE WORKSPACE ACCESS</span>
                        <h1>Welcome back.</h1>
                        <p>Sign in to manage projects, issues, assignments, and your development workflow.</p>
                    </div>
                    <form className="devtrack-form" onSubmit={submit}>
                        <label>
                            Work Email
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@company.dev"
                                autoComplete="email"
                                required
                            />
                        </label>
                        <label>
                            Password
                            <span className="password-field">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label="Toggle password visibility">
                                    {showPassword ? "◉" : "◌"}
                                </button>
                            </span>
                        </label>
                        {error && <div className="form-error">{error}</div>}
                        <button className="primary-button form-submit" type="submit" disabled={loading}>
                            {loading ? "Signing in..." : "Sign In"}
                            <span>→</span>
                        </button>
                    </form>
                    <p className="auth-switch">Don't have an account? <Link to="/register">Create account</Link></p>
                </section>
                <section className="auth-preview">
                    <div className="auth-preview-heading">
                        <div>
                            <h2>Let's continue.</h2>
                        </div>
                        <span className="preview-live">● READY</span>
                    </div>
                    <div className="auth-preview-motto">
                        <span>BUILD.</span>
                        <span>TRACK.</span>
                        <span>SHIP.</span>
                    </div>
                    <p className="auth-preview-message">
                        Pick up where your development workflow left off and keep your projects moving forward.
                    </p>
                    <div className="auth-preview-workflow">
                        <div className="auth-workflow-step">
                            <span className="auth-workflow-number">01</span>
                            <strong>Build</strong>
                            <small>Create projects and organize your development work.</small>
                        </div>
                        <div className="auth-workflow-step">
                            <span className="auth-workflow-number">02</span>
                            <strong>Track</strong>
                            <small>Manage issues, assignments, progress, and collaboration.</small>
                        </div>
                        <div className="auth-workflow-step">
                            <span className="auth-workflow-number">03</span>
                            <strong>Ship</strong>
                            <small>Resolve work and move your team toward completion.</small>
                        </div>
                    </div>
                    <div className="auth-preview-footer">One focused workspace for your development workflow.</div>
                </section>
            </div>
            <footer className="auth-footer">
                <span>● DevTrack Systems Operational</span>
                <span>© 2026 DevTrack</span>
            </footer>
        </div>
    );
}
function RegisterPage({ theme, onToggleTheme }) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mousePosition, setMousePosition] = useState({
        x: 50,
        y: 25,
    });

    const handlePointerMove = (event) => {
        if (!event.isPrimary) {
            return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        setMousePosition({
            x: Math.max(0, Math.min(100, x)),
            y: Math.max(0, Math.min(100, y)),
        });
    };

    const handlePointerLeave = (event) => {
        if (event.pointerType === "mouse" || event.pointerType === "pen") {
            setMousePosition({
                x: 50,
                y: 25,
            });
        }
    };

    const updateField = (field) => (event) => {
        setForm((current) => ({ ...current, [field]: event.target.value }));
    };

    const submit = async (event) => {
        event.preventDefault();
        setError("");
        if (form.password !== form.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await apiRequest("/users", {
                method: "POST",
                body: JSON.stringify({ name: form.name, email: form.email, password: form.password, role: "developer" }),
            });
            navigate("/login", { replace: true, state: { registered: true } });
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="auth-page"
            onPointerMove={handlePointerMove}
            onPointerDown={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{
                "--mouse-x": `${mousePosition.x}%`,
                "--mouse-y": `${mousePosition.y}%`,
            }}
        >
            <div className="auth-ambient" />
            <header className="auth-header">
                <Link to="/" className="app-brand">
                    <DevTrackMark />
                    <span className="brand-name">DevTrack</span>
                    <span className="brand-version">v1.0</span>
                </Link>
                <div className="auth-header-actions">
                    <ThemeToggle theme={theme} onToggle={onToggleTheme} />
                    <Link to="/login" className="auth-header-link">Sign In</Link>
                </div>
            </header>
            <div className="auth-layout">
                <section className="auth-card">
                    <div className="auth-card-heading">
                        <span className="app-eyebrow">WORKSPACE SETUP</span>
                        <h1>Create your DevTrack account.</h1>
                        <p>Start organizing projects, issues, assignments, and development workflow.</p>
                    </div>
                    <form className="devtrack-form" onSubmit={submit}>
                        <label>
                            Full Name
                            <input value={form.name} onChange={updateField("name")} placeholder="Alex Rivera" autoComplete="name" required />
                        </label>
                        <label>
                            Work Email
                            <input type="email" value={form.email} onChange={updateField("email")} placeholder="alex@company.dev" autoComplete="email" required />
                        </label>
                        <label>
                            Password
                            <span className="password-field">
                                <input type={showPassword ? "text" : "password"} value={form.password} onChange={updateField("password")} placeholder="Minimum 6 characters" minLength={6} autoComplete="new-password" required />
                                <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label="Toggle password visibility">{showPassword ? "◉" : "◌"}</button>
                            </span>
                        </label>
                        <label>
                            Confirm Password
                            <input type={showPassword ? "text" : "password"} value={form.confirmPassword} onChange={updateField("confirmPassword")} placeholder="Repeat your password" autoComplete="new-password" required />
                        </label>
                        {error && <div className="form-error">{error}</div>}
                        <button className="primary-button form-submit" type="submit" disabled={loading}>
                            {loading ? "Creating account..." : "Create Account"}
                            <span>→</span>
                        </button>
                    </form>
                    <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
                </section>
                <section className="auth-preview">
                    <div className="auth-preview-heading">
                        <div>
                            <h2>Let's get started.</h2>
                        </div>
                        <span className="preview-live">● READY</span>
                    </div>
                    <div className="auth-preview-motto">
                        <span>BUILD.</span>
                        <span>TRACK.</span>
                        <span>SHIP.</span>
                    </div>
                    <p className="auth-preview-message">
                        Create your workspace, organize your development work, and keep your team moving forward.
                    </p>
                    <div className="auth-preview-workflow">
                        <div className="auth-workflow-step">
                            <span className="auth-workflow-number">01</span>
                            <strong>Build</strong>
                            <small>Create projects and organize your development work.</small>
                        </div>
                        <div className="auth-workflow-step">
                            <span className="auth-workflow-number">02</span>
                            <strong>Track</strong>
                            <small>Manage issues, assignments, progress, and collaboration.</small>
                        </div>
                        <div className="auth-workflow-step">
                            <span className="auth-workflow-number">03</span>
                            <strong>Ship</strong>
                            <small>Resolve work and move your team toward completion.</small>
                        </div>
                    </div>
                    <div className="auth-preview-footer">One focused workspace for your development workflow.</div>
                </section>
            </div>
            <footer className="auth-footer">
                <span>● DevTrack Systems Operational</span>
                <span>© 2026 DevTrack</span>
            </footer>
        </div>
    );
}

function DashboardPage({ theme, onToggleTheme }) {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const loadDashboard = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await apiRequest("/dashboard");
            setDashboard(data);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadDashboard();
    }, []);

    useEffect(() => {
        if (window.location.hash !== "#agent" || !dashboard) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            document.getElementById("agent")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });

        return () => window.cancelAnimationFrame(frame);
    }, [dashboard]);

    const issueStats = dashboard?.issueStats || {};
    const projectStats = dashboard?.projectStats || {};
    const projects = Array.isArray(dashboard?.projectProgress) ? dashboard.projectProgress : [];
    const myWork = Array.isArray(dashboard?.myWork) ? dashboard.myWork : [];
    const currentUser = getStoredAuth().user || {};
    const currentUserId = currentUser._id || currentUser.id || "";
    const userIssueFilter = currentUserId ? `&assignedTo=${encodeURIComponent(currentUserId)}` : "";
    const open = issueStats.open ?? issueStats.openIssues ?? 0;
    const inProgress = issueStats.inProgress ?? issueStats.in_progress ?? 0;
    const resolved = issueStats.resolved ?? 0;
    const overdue = issueStats.overdue ?? 0;
    const activeProjects = projectStats.active ?? projectStats.activeProjects ?? 0;

    return (
        <AppShell theme={theme} onToggleTheme={onToggleTheme} title="Dashboard" eyebrow="DEVTRACK WORKSPACE · OVERVIEW">
            <PageState loading={loading} error={error} onRetry={loadDashboard}>
                <section className="dashboard-welcome">
                    <div>
                        <span className="app-eyebrow">DEVELOPMENT COMMAND CENTER</span>
                        <h2>Good morning, {currentUser?.name?.split(" ")[0] || "Developer"}. <span>◉</span></h2>
                        <p>Here's what's happening across your projects and development workflow.</p>
                    </div>
                    <div className="dashboard-actions">
                        <Link to="/projects" className="secondary-button">View Projects <span>↗</span></Link>
                        <Link to="/issues" className="primary-button">Review Issues <span>→</span></Link>
                    </div>
                </section>

                <section className="app-stat-grid dashboard-stats">
                    <StatCard
                        label="Open Issues"
                        value={open}
                        meta="Awaiting work · yours"
                        tone="blue"
                        icon="◇"
                        to={`/issues?status=open${userIssueFilter}`}
                    />
                    <StatCard
                        label="In Progress"
                        value={inProgress}
                        meta="Active development · yours"
                        tone="cyan"
                        icon="◌"
                        to={`/issues?status=in-progress${userIssueFilter}`}
                    />
                    <StatCard
                        label="Resolved"
                        value={resolved}
                        meta="Completed work · yours"
                        tone="green"
                        icon="✓"
                        to={`/issues?status=resolved${userIssueFilter}`}
                    />
                    <StatCard
                        label="Overdue"
                        value={overdue}
                        meta="Needs attention · yours"
                        tone="red"
                        icon="△"
                        to={`/issues?overdue=true${userIssueFilter}`}
                    />
                    <StatCard
                        label="Active Projects"
                        value={activeProjects}
                        meta="Your current workspaces"
                        tone="purple"
                        icon="▣"
                        to="/projects?mine=true&status=active"
                    />
                </section>

                <div className="dashboard-layout">
                    <section className="dashboard-main-column">
                        <div className="section-title-row">
                            <div><span className="app-eyebrow">PROJECTS</span><h3>Project Progress</h3></div>
                            <Link to="/projects">View all projects →</Link>
                        </div>
                        <div className="project-progress-grid">
                            {projects.length ? projects.slice(0, 6).map((project, index) => (
                                <Link to={`/projects/${project._id || project.id}`} className="progress-project-card" key={project._id || project.id || index}>
                                    <div className="progress-project-topline">
                                        <span>{project.status || "active"}</span>
                                        <strong>{project.progress ?? project.completion ?? 0}%</strong>
                                    </div>
                                    <h4>{project.name || "Untitled Project"}</h4>
                                    <p>{project.description || "Project workspace and development progress."}</p>
                                    <ProgressBar value={project.progress ?? project.completion ?? 0} />
                                    <small>{project.issueCount ?? project.issues ?? 0} tracked issues</small>
                                </Link>
                            )) : (
                                <div className="inline-empty">No project progress is available yet. <Link to="/projects">Create your first project →</Link></div>
                            )}
                        </div>

                        <div className="section-title-row dashboard-work-title">
                            <div><span className="app-eyebrow">ASSIGNED WORK</span><h3>Your Work</h3></div>
                            <Link to={`/issues${currentUserId ? `?assignedTo=${encodeURIComponent(currentUserId)}` : ""}`}>Open issue board →</Link>
                        </div>
                        <div className="work-list">
                            {myWork.length ? myWork.slice(0, 8).map((item, index) => (
                                <Link to={`/issues/${item._id || item.id}`} className="work-row" key={item._id || item.id || index}>
                                    <span className="work-id">{item.issueKey || item.key || `DT-${1000 + index}`}</span>
                                    <div><strong>{item.title || "Assigned issue"}</strong><small>{item.project?.name || item.projectName || "Project workspace"}</small></div>
                                    <PriorityBadge priority={item.priority} />
                                    <StatusBadge status={item.status} />
                                </Link>
                            )) : (
                                <div className="work-empty">
                                    <span className="work-empty-icon">◌</span>
                                    <div>
                                        <strong>No assigned work yet</strong>
                                        <small>Issues assigned to you will appear here.</small>
                                    </div>
                                    <Link to={`/issues${currentUserId ? `?assignedTo=${encodeURIComponent(currentUserId)}` : ""}`}>View my issues →</Link>
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="dashboard-side-column">
                        <section className="agent-widget" id="agent">
                            <div className="agent-widget-header">
                                <div><span className="agent-logo">◆</span><div><strong>DevTrack Agent</strong><small>● Ready · Contextual</small></div></div>
                                <span>AI CORE</span>
                            </div>
                            <p>Use project context to understand progress, review blockers, and surface useful workflow actions.</p>
                            <div className="agent-prompts">
                                <button type="button">Summarize current blockers <span>↗</span></button>
                                <button type="button">Review sprint progress <span>↗</span></button>
                                <button type="button">Find unassigned work <span>↗</span></button>
                            </div>
                            <div className="agent-widget-footer">Context available from your workspace.</div>
                        </section>

                        <section className="adk-brief-placeholder">
                            <div className="adk-placeholder-mark">◆</div>
                            <div>
                                <span className="app-eyebrow">INTELLIGENCE · NEXT</span>
                                <h3>Personal Work Brief</h3>
                                <p>This space is reserved for the ADK Agent to summarize your progress, workload, blockers, and next actions.</p>
                            </div>
                            <span className="adk-placeholder-status">COMING NEXT</span>
                        </section>
                    </aside>
                </div>
            </PageState>
        </AppShell>
    );
}
function ProjectsPage({ theme, onToggleTheme }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState({ name: "", description: "", status: "active" });
    const [saving, setSaving] = useState(false);
    const [query, setQuery] = useState("");
    const loadProjects = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await apiRequest("/projects");
            setProjects(Array.isArray(data) ? data : data.projects || []);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        loadProjects();
    }, []);
    const createProject = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            await apiRequest("/projects", {
                method: "POST",
                body: JSON.stringify(form),
            });
            setForm({ name: "", description: "", status: "active" });
            setShowCreate(false);
            await loadProjects();
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setSaving(false);
        }
    };
    const projectParams = new URLSearchParams(location.search);
    const mineOnly = projectParams.get("mine") === "true";
    const statusFilter = projectParams.get("status") || "";
    const currentUser = getStoredAuth().user || {};
    const currentUserId = String(
        currentUser._id || currentUser.id || currentUser.userId || ""
    );
    const currentUserEmail = String(currentUser.email || "").toLowerCase();

    const matchesCurrentUser = (project) => {
        if (!mineOnly) {
            return true;
        }

        const owner = project?.owner;
        const ownerId = typeof owner === "string"
            ? owner
            : owner?._id || owner?.id || owner?.userId || "";
        const ownerEmail = typeof owner === "object"
            ? String(owner?.email || "").toLowerCase()
            : "";

        if (
            (currentUserId && ownerId && String(ownerId) === currentUserId) ||
            (currentUserEmail && ownerEmail && ownerEmail === currentUserEmail)
        ) {
            return true;
        }

        const members = Array.isArray(project?.members) ? project.members : [];

        return members.some((member) => {
            if (typeof member === "string") {
                return (
                    (currentUserId && String(member) === currentUserId) ||
                    (currentUserEmail && String(member).toLowerCase() === currentUserEmail)
                );
            }

            const memberId = member?._id || member?.id || member?.userId || "";
            const memberEmail = String(member?.email || "").toLowerCase();

            return (
                (currentUserId && memberId && String(memberId) === currentUserId) ||
                (currentUserEmail && memberEmail && memberEmail === currentUserEmail)
            );
        });
    };

    const normalizedQuery = query.trim().toLowerCase();
    const visibleProjects = projects.filter((project) => {
        const searchableText = `${project.name || ""} ${project.description || ""}`.toLowerCase();
        const matchesQuery = searchableText.includes(normalizedQuery);
        const matchesStatus = !statusFilter || project.status === statusFilter;
        return matchesQuery && matchesStatus && matchesCurrentUser(project);
    });
    const activeProjects = visibleProjects.filter((project) => project.status === "active").length;
    const completedProjects = visibleProjects.filter((project) => project.status === "completed").length;
    const totalMembers = visibleProjects.reduce(
        (total, project) => total + (Array.isArray(project.members) ? project.members.length : 0),
        0
    );
    const getProjectProgress = (project) => {
        if (typeof project.progress === "number") {
            return project.progress;
        }
        if (typeof project.completion === "number") {
            return project.completion;
        }
        if (project.status === "completed") {
            return 100;
        }
        return 0;
    };
    const getMemberInitial = (member) => {
        const name = member?.name || member?.username || member?.email || "M";
        return name.charAt(0).toUpperCase();
    };
    const getMemberKey = (member, index) => member?._id || member?.id || member?.email || index;
    return (
        <AppShell theme={theme} onToggleTheme={onToggleTheme} title="Projects" eyebrow="WORKSPACE · PROJECTS">
            <section className="projects-page-intro">
                <div>
                    <div className="projects-title-row">
                        <div>
                            <span className="app-eyebrow">ACTIVE WORKSPACES</span>
                            <p>Manage development workspaces, repositories, milestones, and team ownership.</p>
                        </div>
                        <button type="button" className="primary-button" onClick={() => setShowCreate(true)}>
                            ＋ New Project
                        </button>
                    </div>
                </div>
            </section>
            <section className="app-stat-grid project-stats">
                <StatCard
                    label="Active Workspaces"
                    value={activeProjects}
                    meta="Current projects"
                    tone="green"
                    icon="▣"
                />
                <StatCard
                    label="Total Projects"
                    value={projects.length}
                    meta="Across your workspace"
                    tone="cyan"
                    icon="◫"
                />
                <StatCard
                    label="Completed"
                    value={completedProjects}
                    meta="Shipped workspaces"
                    tone="blue"
                    icon="✓"
                />
                <StatCard
                    label="Team Membership"
                    value={totalMembers}
                    meta="Project member links"
                    tone="purple"
                    icon="♧"
                />
            </section>
            <section className="projects-toolbar-panel">
                <div className="list-toolbar projects-list-toolbar">
                    <div className="list-search projects-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Filter projects by name or description..."
                            aria-label="Filter projects"
                        />
                        <kbd>/</kbd>
                    </div>
                    <div className="projects-toolbar-actions">
                        <span className="toolbar-count">{visibleProjects.length} visible</span>
                        <button type="button" className="secondary-button" onClick={loadProjects} disabled={loading}>
                            ↻ Refresh
                        </button>
                    </div>
                </div>
            </section>
            <PageState loading={loading} error={error} onRetry={loadProjects}>
                <section className="projects-results-heading">
                    <div>
                        <span className="app-eyebrow">PROJECT DIRECTORY</span>
                        <h2>{visibleProjects.length ? "Your development projects" : "No projects found"}</h2>
                    </div>
                    <span>{visibleProjects.length} of {projects.length} projects</span>
                </section>
                {visibleProjects.length ? (
                    <div className="project-card-grid projects-template-grid">
                        {visibleProjects.map((project, index) => {
                            const progress = getProjectProgress(project);
                            const members = Array.isArray(project.members) ? project.members : [];
                            return (
                                <Link
                                    to={`/projects/${project._id || project.id}`}
                                    className="project-card projects-template-card"
                                    key={project._id || project.id || index}
                                >
                                    <div className="project-card-header">
                                        <span className="project-id">PRJ-{String(index + 1).padStart(2, "0")}</span>
                                        <StatusBadge status={project.status || "active"} />
                                    </div>
                                    <div className="project-card-title-row">
                                        <span className="project-card-icon" aria-hidden="true">▣</span>
                                        <h3>{project.name || "Untitled Project"}</h3>
                                    </div>
                                    <p className="project-card-description">
                                        {project.description || "Developer workspace for organizing project delivery, issues, assignments, and progress."}
                                    </p>
                                    <div className="project-card-tags">
                                        <span>Development</span>
                                        <span>{project.status || "active"}</span>
                                        {members.length > 0 && <span>{members.length} members</span>}
                                    </div>
                                    <div className="project-card-progress-row">
                                        <span>Project progress</span>
                                        <strong>{progress}%</strong>
                                    </div>
                                    <ProgressBar value={progress} />
                                    <div className="project-card-footer">
                                        <div className="project-member-stack" aria-label={`${members.length} project members`}>
                                            {members.slice(0, 4).map((member, memberIndex) => (
                                                <span
                                                    className="project-member-avatar"
                                                    key={getMemberKey(member, memberIndex)}
                                                    title={member?.name || member?.email || "Project member"}
                                                >
                                                    {getMemberInitial(member)}
                                                </span>
                                            ))}
                                            {members.length > 4 && (
                                                <span className="project-member-avatar project-member-more">
                                                    +{members.length - 4}
                                                </span>
                                            )}
                                            {!members.length && (
                                                <span className="project-member-empty">No members assigned</span>
                                            )}
                                        </div>
                                        <span className="project-view-link">View project →</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="app-state-card empty-state compact-state projects-empty-state">
                        <span className="state-icon">▣</span>
                        <strong>{projects.length ? "No matching projects." : "No projects yet."}</strong>
                        <span>
                            {mineOnly
                                ? "No active project is assigned to this user."
                                : projects.length
                                    ? "Try a different project name or description."
                                    : "Create a workspace to start organizing your development workflow."}
                        </span>
                        {projects.length ? (
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => {
                                    setQuery("");
                                    navigate("/projects");
                                }}
                            >
                                Clear Filter
                            </button>
                        ) : (
                            <button type="button" className="primary-button" onClick={() => setShowCreate(true)}>Create Project</button>
                        )}
                    </div>
                )}
                <div className="projects-footer-summary">
                    <span>
                        {mineOnly
                            ? `Showing ${visibleProjects.length} active project${visibleProjects.length === 1 ? "" : "s"} assigned to you`
                            : `Showing ${visibleProjects.length} project${visibleProjects.length === 1 ? "" : "s"}`}
                    </span>
                    <span>DevTrack workspace · Live project state</span>
                </div>
            </PageState>
            {showCreate && (
                <div className="modal-backdrop" onMouseDown={() => setShowCreate(false)}>
                    <form
                        className="devtrack-modal"
                        onSubmit={createProject}
                        onMouseDown={(event) => event.stopPropagation()}
                    >
                        <div className="modal-header">
                            <div>
                                <span className="app-eyebrow">NEW WORKSPACE</span>
                                <h2>Create Project</h2>
                            </div>
                            <button type="button" onClick={() => setShowCreate(false)}>×</button>
                        </div>
                        <label>
                            Project Name
                            <input
                                value={form.name}
                                onChange={(event) => setForm({ ...form, name: event.target.value })}
                                required
                                placeholder="Distributed Telemetry Engine"
                            />
                        </label>
                        <label>
                            Description
                            <textarea
                                value={form.description}
                                onChange={(event) => setForm({ ...form, description: event.target.value })}
                                placeholder="What is this project building?"
                                rows={4}
                            />
                        </label>
                        <label>
                            Status
                            <select
                                value={form.status}
                                onChange={(event) => setForm({ ...form, status: event.target.value })}
                            >
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                                <option value="archived">Archived</option>
                            </select>
                        </label>
                        {error && <div className="form-error">{error}</div>}
                        <div className="modal-actions">
                            <button type="button" className="secondary-button" onClick={() => setShowCreate(false)}>
                                Cancel
                            </button>
                            <button className="primary-button" type="submit" disabled={saving}>
                                {saving ? "Creating..." : "Create Project"}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AppShell>
    );
}
function ProjectDetailsPage({ theme, onToggleTheme }) {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [issuesLoading, setIssuesLoading] = useState(true);
    const [error, setError] = useState("");
    const [issuesError, setIssuesError] = useState("");

    const loadProject = async () => {
        setLoading(true);
        setError("");
        try {
            const data = await apiRequest(`/projects/${id}`);
            setProject(data.project || data);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };

    const loadProjectIssues = async () => {
        setIssuesLoading(true);
        setIssuesError("");
        try {
            const params = new URLSearchParams({
                project: id,
                page: "1",
                limit: "100",
            });
            const data = await apiRequest(`/issues?${params.toString()}`);
            setIssues(Array.isArray(data) ? data : data.issues || []);
        } catch (requestError) {
            setIssues([]);
            setIssuesError(requestError.message);
        } finally {
            setIssuesLoading(false);
        }
    };

    useEffect(() => {
        loadProject();
        loadProjectIssues();
    }, [id]);

    const current = project || demoProjects.find((item) => item._id === id);
    const members = Array.isArray(current?.members) ? current.members : [];

    const totalIssues = issues.length;
    const resolvedIssues = issues.filter(
        (issue) => issue.status === "resolved" || issue.status === "closed"
    ).length;
    const activeIssues = issues.filter(
        (issue) => issue.status === "open" || issue.status === "in-progress"
    ).length;

    const progress = current?.status === "completed"
        ? 100
        : totalIssues
            ? Math.round((resolvedIssues / totalIssues) * 100)
            : 0;

    const releaseLabel = current?.status === "completed"
        ? "Shipped"
        : current?.status === "archived"
            ? "Archived"
            : "In Progress";

    const workflowStatus = current?.status === "completed"
        ? "resolved"
        : totalIssues > 0
            ? "in-progress"
            : "open";

    const visibleIssues = issues.slice(0, 5);

    const getMemberInitial = (member) => {
        const name = member?.name || member?.username || member?.email || "U";
        return name.charAt(0).toUpperCase();
    };

    return (
        <AppShell
            theme={theme}
            onToggleTheme={onToggleTheme}
            title={current?.name || "Project Details"}
            eyebrow="WORKSPACE · PROJECT DETAIL"
        >
            <PageState loading={loading} error={error} onRetry={loadProject}>
                <section className="project-hero-card">
                    <div>
                        <div className="project-card-header">
                            <span className="project-id">
                                {current?._id
                                    ? `PRJ-${String(current._id).slice(-6).toUpperCase()}`
                                    : "PROJECT"}
                            </span>
                            <StatusBadge status={current?.status || "active"} />
                        </div>

                        <h2>{current?.name || "Project workspace"}</h2>

                        <p>
                            {current?.description ||
                                "Project overview, milestones, members, and issue activity."}
                        </p>

                        <div className="project-card-tags">
                            <span>Development</span>
                            <span>{releaseLabel}</span>
                            <span>{members.length} members</span>
                        </div>
                    </div>

                    <div className="project-hero-actions">
                        <Link to={`/issues?project=${encodeURIComponent(id)}`} className="secondary-button">
                            View Issues
                        </Link>
                        <Link to="/projects" className="primary-button">
                            Back to Projects
                        </Link>
                    </div>
                </section>

                <section className="app-stat-grid project-detail-stats">
                    <StatCard
                        label="Project Progress"
                        value={`${progress}%`}
                        meta="Based on resolved issues"
                        tone="blue"
                        icon="◔"
                    />
                    <StatCard
                        label="Tracked Issues"
                        value={totalIssues}
                        meta={issuesLoading ? "Loading issue workspace" : "Current project issues"}
                        tone="cyan"
                        icon="◇"
                    />
                    <StatCard
                        label="Team Members"
                        value={members.length}
                        meta="Project collaborators"
                        tone="green"
                        icon="♧"
                    />
                    <StatCard
                        label="Target Release"
                        value={releaseLabel}
                        meta="Current project state"
                        tone="purple"
                        icon="↗"
                    />
                </section>

                <div className="project-detail-template">
                    <section className="project-detail-overview-grid">
                        <div className="detail-panel project-overview-panel">
                            <div className="section-title-row compact">
                                <div>
                                    <span className="app-eyebrow">PROJECT OVERVIEW</span>
                                    <h3>Delivery Snapshot</h3>
                                </div>
                                <span className="panel-live">
                                    {current?.status === "completed" ? "Completed" : "Live workspace"}
                                </span>
                            </div>

                            <p className="detail-copy">
                                {current?.description ||
                                    "Keep project context connected to issues, assignments, team collaboration, and development progress from one DevTrack workspace."}
                            </p>

                            <div className="detail-metrics">
                                <div>
                                    <span>Issue completion</span>
                                    <strong>{progress}%</strong>
                                    <ProgressBar value={progress} />
                                </div>

                                <div>
                                    <span>Active work</span>
                                    <strong>{activeIssues}</strong>
                                    <small>
                                        {activeIssues === 1
                                            ? "issue currently needs work"
                                            : "issues currently need work"}
                                    </small>
                                </div>

                                <div>
                                    <span>Resolved work</span>
                                    <strong>{resolvedIssues}</strong>
                                    <small>
                                        {totalIssues
                                            ? `${totalIssues} tracked issue${totalIssues === 1 ? "" : "s"}`
                                            : "No issues tracked yet"}
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="detail-panel project-members-panel">
                            <div className="section-title-row compact">
                                <div>
                                    <span className="app-eyebrow">COLLABORATION</span>
                                    <h3>Project Members</h3>
                                </div>
                                <span>{members.length}</span>
                            </div>

                            {members.length ? (
                                <div className="project-member-list">
                                    {members.map((member, index) => (
                                        <div
                                            className="member-row"
                                            key={member._id || member.id || member.email || index}
                                        >
                                            <span className="user-avatar">
                                                {getMemberInitial(member)}
                                            </span>

                                            <div>
                                                <strong>
                                                    {member.name ||
                                                        member.username ||
                                                        "Project member"}
                                                </strong>
                                                <small>
                                                    {member.email || "Workspace collaborator"}
                                                </small>
                                            </div>

                                            <span>{member.role || "developer"}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="inline-empty">
                                    No members returned by the project API yet.
                                </div>
                            )}
                        </div>
                    </section>

                    <section className="project-detail-work-grid">
                        <div className="detail-panel project-roadmap-panel">
                            <div className="section-title-row compact">
                                <div>
                                    <span className="app-eyebrow">DEVELOPMENT WORKFLOW</span>
                                    <h3>Project Roadmap</h3>
                                </div>
                                <span>3 phases</span>
                            </div>

                            <div className="milestone-list">
                                <div>
                                    <span className="milestone-index done">01</span>
                                    <div>
                                        <strong>Workspace foundation</strong>
                                        <p>
                                            Project structure, team context, and the core development workspace are ready.
                                        </p>
                                    </div>
                                    <StatusBadge status="resolved" />
                                </div>

                                <div>
                                    <span
                                        className={`milestone-index ${
                                            workflowStatus === "in-progress" ? "active" : ""
                                        }`}
                                    >
                                        02
                                    </span>
                                    <div>
                                        <strong>Issue workflow</strong>
                                        <p>
                                            Track, prioritize, assign, discuss, and resolve the work connected to this project.
                                        </p>
                                    </div>
                                    <StatusBadge status={workflowStatus} />
                                </div>

                                <div>
                                    <span
                                        className={`milestone-index ${
                                            current?.status === "completed" ? "done" : ""
                                        }`}
                                    >
                                        03
                                    </span>
                                    <div>
                                        <strong>Release readiness</strong>
                                        <p>
                                            Move the project toward completion as active work is resolved and the workspace is finalized.
                                        </p>
                                    </div>
                                    <StatusBadge
                                        status={
                                            current?.status === "completed"
                                                ? "resolved"
                                                : "open"
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="detail-panel agent-mini project-agent-panel">
                            <div className="agent-mini-heading">
                                <div>
                                    <span className="agent-logo">◆</span>
                                    <span className="app-eyebrow">DEVTRACK AGENT</span>
                                </div>
                                <span className="panel-live">Context ready</span>
                            </div>

                            <h3>Project context available.</h3>

                            <p>
                                Use the Agent to understand project progress, review blockers,
                                and surface workflow actions from the workspace.
                            </p>

                            <div className="agent-mini-actions">
                                <span>Project-aware assistance</span>
                                <Link to="/dashboard#agent">Open Agent →</Link>
                            </div>
                        </div>
                    </section>

                    <section className="detail-panel project-issues-panel">
                        <div className="section-title-row compact">
                            <div>
                                <span className="app-eyebrow">ACTIVE WORK</span>
                                <h3>Project Issues</h3>
                            </div>

                            <Link to={`/issues?project=${encodeURIComponent(id)}`}>
                                Open issue board →
                            </Link>
                        </div>

                        {issuesLoading ? (
                            <div className="inline-empty">
                                Loading issues for this project...
                            </div>
                        ) : issuesError ? (
                            <div className="inline-empty">
                                Issue data is currently unavailable. Open the issue board to retry.
                            </div>
                        ) : visibleIssues.length ? (
                            <div className="project-issues-list">
                                {visibleIssues.map((issue, index) => (
                                    <Link
                                        to={`/issues/${issue._id || issue.id}`}
                                        className="project-issue-row"
                                        key={issue._id || issue.id || index}
                                    >
                                        <span className="work-id">
                                            {issue.key || `DT-${1000 + index}`}
                                        </span>

                                        <div className="project-issue-copy">
                                            <strong>{issue.title || "Untitled issue"}</strong>
                                            <small>
                                                {issue.assignedTo?.name || "Unassigned"} ·{" "}
                                                {issue.project?.name ||
                                                    current?.name ||
                                                    "Project workspace"}
                                            </small>
                                        </div>

                                        <PriorityBadge priority={issue.priority} />
                                        <StatusBadge status={issue.status} />
                                        <span className="project-issue-arrow">↗</span>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="inline-empty">
                                No issues are currently linked to this project.
                            </div>
                        )}
                    </section>
                </div>
            </PageState>
        </AppShell>
    );
}

function IssuesPage({ theme, onToggleTheme }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchInput, setSearchInput] = useState(new URLSearchParams(location.search).get("search") || "");
    const [search, setSearch] = useState(new URLSearchParams(location.search).get("search") || "");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");
    const [projectFilter, setProjectFilter] = useState(new URLSearchParams(location.search).get("project") || "");
    const [assigneeFilter, setAssigneeFilter] = useState(
        new URLSearchParams(location.search).get("assignedTo") || ""
    );
    const issuesRequestId = useRef(0);
    const [overdue, setOverdue] = useState(false);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [projects, setProjects] = useState([]);
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        priority: "medium",
        status: "open",
        deadline: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nextSearch = params.get("search") || "";
        const nextStatus = params.get("status") || "";
        const nextPriority = params.get("priority") || "";
        const nextProject = params.get("project") || "";
        const nextAssignee = params.get("assignedTo") || "";
        const nextOverdue = params.get("overdue") === "true";
        const assignTo = params.get("assignTo") || "";

        setSearch(nextSearch);
        setSearchInput(nextSearch);
        setStatus(nextStatus);
        setPriority(nextPriority);
        setProjectFilter(nextProject);
        setAssigneeFilter(nextAssignee);
        setOverdue(nextOverdue);
        setPage(1);

        if (assignTo) {
            setForm((current) => ({
                ...current,
                assignedTo: assignTo,
            }));
            setShowCreate(true);
        }
    }, [location.search]);

    const loadIssues = async () => {
        const requestId = ++issuesRequestId.current;
        setLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: assigneeFilter ? "100" : "20",
            });
            if (search.trim()) params.set("search", search.trim());
            if (status) params.set("status", status);
            if (priority) params.set("priority", priority);
            if (projectFilter) params.set("project", projectFilter);
            if (assigneeFilter) params.set("assignedTo", assigneeFilter);
            if (overdue) params.set("overdue", "true");

            const data = await apiRequest(`/issues?${params.toString()}`);

            // Ignore an older request if navigation/filter changes triggered a newer one.
            if (requestId !== issuesRequestId.current) {
                return;
            }

            setIssues(Array.isArray(data) ? data : data.issues || []);
            setPagination(data?.pagination || null);
        } catch (requestError) {
            if (requestId !== issuesRequestId.current) {
                return;
            }
            setError(requestError.message);
            setIssues([]);
            setPagination(null);
        } finally {
            if (requestId === issuesRequestId.current) {
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        loadIssues();
    }, [page, search, status, priority, projectFilter, assigneeFilter, overdue]);

    useEffect(() => {
        apiRequest("/projects")
            .then((data) => setProjects(Array.isArray(data) ? data : data.projects || []))
            .catch(() => setProjects([]));

        apiRequest("/users")
            .then((data) => setMembers(Array.isArray(data) ? data : data.users || []))
            .catch(() => setMembers([]));
    }, []);

    const submitSearch = (event) => {
        event.preventDefault();
        const params = new URLSearchParams(location.search);
        const value = searchInput.trim();
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        params.delete("page");
        navigate(`/issues${params.toString() ? `?${params.toString()}` : ""}`);
    };

    const clearFilters = () => {
        setSearchInput("");
        setSearch("");
        setStatus("");
        setPriority("");
        setProjectFilter("");
        setAssigneeFilter("");
        setOverdue(false);
        setPage(1);
        navigate("/issues", { replace: true });
    };

    const createIssue = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            await apiRequest("/issues", {
                method: "POST",
                body: JSON.stringify({
                    ...form,
                    assignedTo: form.assignedTo || null,
                    deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
                }),
            });
            setShowCreate(false);
            setForm({
                title: "",
                description: "",
                project: "",
                assignedTo: "",
                priority: "medium",
                status: "open",
                deadline: "",
            });
            setPage(1);
            await loadIssues();
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setSaving(false);
        }
    };

    const totalIssues = pagination?.totalIssues ?? issues.length;
    const openCount = issues.filter((item) => item.status === "open").length;
    const progressCount = issues.filter((item) => item.status === "in-progress").length;
    const resolvedCount = issues.filter((item) => item.status === "resolved").length;
    const closedCount = issues.filter((item) => item.status === "closed").length;
    const overdueCount = issues.filter((item) => {
        if (!item.deadline || item.status === "resolved" || item.status === "closed") return false;
        return new Date(item.deadline).getTime() < Date.now();
    }).length;
    const totalPages = pagination?.totalPages || 1;
    const currentPage = pagination?.currentPage || page;
    const hasNextPage = pagination?.hasNextPage ?? currentPage < totalPages;
    const hasPreviousPage = pagination?.hasPreviousPage ?? currentPage > 1;

    const formatDeadline = (deadline, issueStatus) => {
        if (!deadline) return "—";
        const date = new Date(deadline);
        const isOverdue = date.getTime() < Date.now() && issueStatus !== "resolved" && issueStatus !== "closed";
        return (
            <span className={isOverdue ? "issue-deadline overdue" : "issue-deadline"}>
                {date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                {isOverdue && <small>Overdue</small>}
            </span>
        );
    };

    return (
        <AppShell theme={theme} onToggleTheme={onToggleTheme} title="Issues" eyebrow="WORKSPACE · ISSUE TRACKING">
            <section className="page-intro-row">
                <div>
                    <span className="app-eyebrow">ACTIVE WORK</span>
                    <p>Search, prioritize, assign, and resolve development issues across your projects.</p>
                </div>
                <div className="page-intro-actions">
                    <button type="button" className="secondary-button" onClick={loadIssues} disabled={loading}>
                        ↻ Refresh
                    </button>
                    <button type="button" className="primary-button" onClick={() => setShowCreate(true)}>
                        ＋ New Issue
                    </button>
                </div>
            </section>

            <section className="app-stat-grid issue-stats">
                <StatCard label="Open" value={openCount} meta="Needs triage" tone="blue" icon="◇" />
                <StatCard label="In Progress" value={progressCount} meta="Active work" tone="cyan" icon="◌" />
                <StatCard label="Resolved" value={resolvedCount} meta="Completed work" tone="green" icon="✓" />
                <StatCard label="Closed" value={closedCount} meta="Finished issues" tone="purple" icon="■" />
                <StatCard label="Overdue" value={overdueCount} meta="Needs attention" tone="red" icon="△" />
            </section>

            <section className="issue-filter-toolbar">
                <form className="list-search issue-search" onSubmit={submitSearch}>
                    <span aria-hidden="true">⌕</span>
                    <input
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        placeholder="Search issues, titles, descriptions..."
                        aria-label="Search issues"
                    />
                    <kbd>↵</kbd>
                </form>

                <select value={status} onChange={(event) => { setStatus(event.target.value); setPage(1); }} aria-label="Filter by status">
                    <option value="">All status</option>
                    <option value="open">Open</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                </select>

                <select value={priority} onChange={(event) => { setPriority(event.target.value); setPage(1); }} aria-label="Filter by priority">
                    <option value="">All priority</option>
                    <option value="critical">Critical</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <select value={projectFilter} onChange={(event) => { setProjectFilter(event.target.value); setPage(1); }} aria-label="Filter by project">
                    <option value="">All projects</option>
                    {projects.map((project) => (
                        <option key={project._id || project.id} value={project._id || project.id}>
                            {project.name}
                        </option>
                    ))}
                </select>

                <select value={assigneeFilter} onChange={(event) => { setAssigneeFilter(event.target.value); setPage(1); }} aria-label="Filter by assignee">
                    <option value="">All assignees</option>
                    {members.map((member) => (
                        <option key={member._id || member.id} value={member._id || member.id}>
                            {member.name || member.email}
                        </option>
                    ))}
                </select>

                <label className="issue-filter-check">
                    <input
                        type="checkbox"
                        checked={overdue}
                        onChange={(event) => { setOverdue(event.target.checked); setPage(1); }}
                    />
                    <span>Overdue</span>
                </label>

                <button type="button" className="secondary-button" onClick={clearFilters}>
                    Clear
                </button>
            </section>

            <section className="issue-results-bar">
                <div>
                    <span className="app-eyebrow">ISSUE DIRECTORY</span>
                    <strong>{totalIssues} {totalIssues === 1 ? "issue" : "issues"}</strong>
                    <small>{loading ? "Syncing..." : `Page ${currentPage} of ${totalPages}`}</small>
                </div>
                <div className="issue-results-summary">
                    <span>{search || status || priority || projectFilter || assigneeFilter || overdue ? "Filtered results" : "All workspace issues"}</span>
                </div>
            </section>

            <PageState loading={loading} error={error} onRetry={loadIssues}>
                <section className="issue-table-panel">
                    <div className="issue-table-head">
                        <span>STATUS</span>
                        <span>ISSUE ID & TITLE</span>
                        <span>PROJECT</span>
                        <span>PRIORITY</span>
                        <span>ASSIGNEE</span>
                        <span>DEADLINE</span>
                        <span>UPDATED</span>
                    </div>

                    {issues.map((issue, index) => (
                        <Link
                            to={`/issues/${issue._id || issue.id}`}
                            className="issue-table-row"
                            key={issue._id || issue.id || index}
                        >
                            <span><StatusBadge status={issue.status} /></span>
                            <div className="issue-title-cell">
                                <span className="issue-key">{issue.key || `DT-${1000 + index}`}</span>
                                <strong>{issue.title || "Untitled issue"}</strong>
                                <small>{issue.description || "No description provided."}</small>
                            </div>
                            <span>{issue.project?.name || issue.projectName || "Project"}</span>
                            <PriorityBadge priority={issue.priority} />
                            <span>{issue.assignedTo?.name || "Unassigned"}</span>
                            <span>{formatDeadline(issue.deadline, issue.status)}</span>
                            <span>{issue.updatedAt ? new Date(issue.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" }) : "—"}</span>
                        </Link>
                    ))}

                    {!issues.length && (
                        <div className="inline-empty table-empty">
                            No issues match the current filters.
                        </div>
                    )}

                    <div className="issue-table-footer">
                        <span>
                            Showing {issues.length ? `${(currentPage - 1) * (pagination?.limit || 20) + 1}–${Math.min((currentPage - 1) * (pagination?.limit || 20) + issues.length, totalIssues)}` : "0"} of {totalIssues}
                        </span>
                        <div className="issue-pagination">
                            <button type="button" className="secondary-button" disabled={!hasPreviousPage || loading} onClick={() => setPage((current) => Math.max(1, current - 1))}>
                                ← Previous
                            </button>
                            <span>Page {currentPage} / {totalPages}</span>
                            <button type="button" className="secondary-button" disabled={!hasNextPage || loading} onClick={() => setPage((current) => current + 1)}>
                                Next →
                            </button>
                        </div>
                    </div>
                </section>
            </PageState>

            {showCreate && (
                <div className="modal-backdrop" onMouseDown={() => setShowCreate(false)}>
                    <form className="devtrack-modal wide-modal" onSubmit={createIssue} onMouseDown={(event) => event.stopPropagation()}>
                        <div className="modal-header">
                            <div>
                                <span className="app-eyebrow">ISSUE TRIAGE</span>
                                <h2>Create Issue</h2>
                            </div>
                            <button type="button" onClick={() => setShowCreate(false)}>×</button>
                        </div>

                        <label>
                            Title
                            <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required placeholder="Implement authentication callback handler" />
                        </label>

                        <label>
                            Description
                            <textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} rows={4} placeholder="Describe the work that needs to be completed." />
                        </label>

                        <div className="form-grid-two">
                            <label>
                                Project
                                <select value={form.project} onChange={(event) => setForm({ ...form, project: event.target.value })} required>
                                    <option value="">Select project</option>
                                    {projects.map((project) => (
                                        <option key={project._id || project.id} value={project._id || project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label>
                                Assignee
                                <select value={form.assignedTo} onChange={(event) => setForm({ ...form, assignedTo: event.target.value })}>
                                    <option value="">Unassigned</option>
                                    {members.map((member) => (
                                        <option key={member._id || member.id} value={member._id || member.id}>
                                            {member.name || member.email}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="form-grid-two">
                            <label>
                                Priority
                                <select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="critical">Critical</option>
                                </select>
                            </label>
                            <label>
                                Status
                                <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                                    <option value="open">Open</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                </select>
                            </label>
                        </div>

                        <label>
                            Deadline
                            <input type="datetime-local" value={form.deadline} onChange={(event) => setForm({ ...form, deadline: event.target.value })} />
                        </label>

                        {error && <div className="form-error">{error}</div>}
                        <div className="modal-actions">
                            <button type="button" className="secondary-button" onClick={() => setShowCreate(false)}>Cancel</button>
                            <button className="primary-button" type="submit" disabled={saving}>{saving ? "Creating..." : "Create Issue"}</button>
                        </div>
                    </form>
                </div>
            )}
        </AppShell>
    );
}

function IssueDetailsPage({ theme, onToggleTheme }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [issue, setIssue] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [comment, setComment] = useState("");
    const [commentLoading, setCommentLoading] = useState(false);

    const loadIssue = async () => {
        setLoading(true);
        setError("");

        try {
            const data = await apiRequest(`/issues/${id}`);
            const loadedIssue = data.issue || data;
            setIssue(loadedIssue);

            try {
                const commentData = await apiRequest(`/issues/${id}/comments`);
                setComments(
                    Array.isArray(commentData)
                        ? commentData
                        : commentData.comments || []
                );
            } catch {
                setComments([]);
            }
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadIssue();
    }, [id]);

    const addComment = async (event) => {
        event.preventDefault();

        if (!comment.trim()) {
            return;
        }

        setCommentLoading(true);

        try {
            const data = await apiRequest(`/issues/${id}/comments`, {
                method: "POST",
                body: JSON.stringify({ content: comment.trim() }),
            });

            setComments((current) => [...current, data.comment || data]);
            setComment("");
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setCommentLoading(false);
        }
    };

    const issueKey = issue?.key || `DT-${id?.slice(-4) || "0000"}`;
    const projectId = issue?.project?._id || issue?.project?.id;
    const projectName = issue?.project?.name || "Project workspace";
    const assigneeName = issue?.assignedTo?.name || "Unassigned";
    const creatorName = issue?.createdBy?.name || "—";
    const deadline = issue?.deadline
        ? new Date(issue.deadline).toLocaleString()
        : "No deadline";

    const workflowProgress =
        issue?.status === "resolved" || issue?.status === "closed"
            ? 100
            : issue?.status === "in-progress"
                ? 55
                : 20;

    return (
        <AppShell
            theme={theme}
            onToggleTheme={onToggleTheme}
            title="Issue Details"
            eyebrow="WORKSPACE · ISSUE DETAIL"
        >
            <PageState loading={loading} error={error} onRetry={loadIssue}>
                <section className="issue-detail-page">
                    <div className="issue-detail-toolbar">
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => navigate("/issues")}
                        >
                            ← Back to Issues
                        </button>

                        <div className="issue-detail-toolbar-actions">
                            <StatusBadge status={issue?.status} />
                            <PriorityBadge priority={issue?.priority} />
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={loadIssue}
                                disabled={loading}
                            >
                                ↻ Refresh
                            </button>
                        </div>
                    </div>

                    <header className="issue-detail-header">
                        <div className="issue-detail-header-main">
                            <div className="issue-detail-breadcrumb">
                                <span>ISSUE</span>
                                <span>/</span>
                                <strong>{issueKey}</strong>
                            </div>

                            <div className="issue-detail-title-row">
                                <div>
                                    <h2>{issue?.title || "Untitled Issue"}</h2>
                                    <p>
                                        {issue?.description ||
                                            "No issue description has been added yet."}
                                    </p>
                                </div>

                                <div className="issue-detail-header-badges">
                                    <StatusBadge status={issue?.status} />
                                    <PriorityBadge priority={issue?.priority} />
                                </div>
                            </div>
                        </div>
                    </header>

                    <div className="issue-detail-layout">
                        <main className="issue-detail-main">
                            <section className="detail-panel issue-description-panel">
                                <div className="issue-detail-section-heading">
                                    <div>
                                        <span className="app-eyebrow">
                                            SPECIFICATION & DESCRIPTION
                                        </span>
                                        <h3>Issue Context</h3>
                                    </div>
                                    <span className="detail-live-label">Live issue</span>
                                </div>

                                <div className="issue-description-content">
                                    <p>
                                        {issue?.description ||
                                            "No issue description has been added yet."}
                                    </p>
                                </div>

                                <div className="issue-context-strip">
                                    <div>
                                        <span>STATUS</span>
                                        <StatusBadge status={issue?.status} />
                                    </div>
                                    <div>
                                        <span>PRIORITY</span>
                                        <PriorityBadge priority={issue?.priority} />
                                    </div>
                                    <div>
                                        <span>PROJECT</span>
                                        <strong>{projectName}</strong>
                                    </div>
                                </div>
                            </section>

                            <section className="detail-panel issue-comments-panel">
                                <div className="issue-detail-section-heading">
                                    <div>
                                        <span className="app-eyebrow">
                                            ACTIVITY THREAD
                                        </span>
                                        <h3>Comments & Updates</h3>
                                    </div>
                                    <span className="detail-count">
                                        {comments.length}{" "}
                                        {comments.length === 1 ? "comment" : "comments"}
                                    </span>
                                </div>

                                <div className="comment-list">
                                    {comments.length ? (
                                        comments.map((item, index) => (
                                            <article
                                                className="comment-row"
                                                key={item._id || item.id || index}
                                            >
                                                <span className="comment-avatar">
                                                    {(
                                                        item.user?.name ||
                                                        item.createdBy?.name ||
                                                        "D"
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>

                                                <div className="comment-content">
                                                    <div className="comment-meta">
                                                        <strong>
                                                            {item.user?.name ||
                                                                item.createdBy?.name ||
                                                                "Developer"}
                                                        </strong>
                                                        <small>
                                                            {item.createdAt
                                                                ? new Date(
                                                                    item.createdAt
                                                                ).toLocaleString()
                                                                : "Recently"}
                                                        </small>
                                                    </div>
                                                    <p>{item.content}</p>
                                                </div>
                                            </article>
                                        ))
                                    ) : (
                                        <div className="inline-empty">
                                            No comments yet. Start the issue discussion
                                            below.
                                        </div>
                                    )}
                                </div>

                                <form
                                    className="comment-form issue-comment-form"
                                    onSubmit={addComment}
                                >
                                    <textarea
                                        value={comment}
                                        onChange={(event) =>
                                            setComment(event.target.value)
                                        }
                                        rows={4}
                                        placeholder="Write a constructive comment..."
                                    />
                                    <div className="comment-form-footer">
                                        <span>Keep the issue discussion clear and useful.</span>
                                        <button
                                            className="primary-button"
                                            type="submit"
                                            disabled={commentLoading}
                                        >
                                            {commentLoading
                                                ? "Posting..."
                                                : "Add Comment"}
                                            <span>→</span>
                                        </button>
                                    </div>
                                </form>
                            </section>
                        </main>

                        <aside className="issue-detail-side">
                            <section className="detail-panel issue-properties-panel">
                                <div className="issue-detail-section-heading compact">
                                    <div>
                                        <span className="app-eyebrow">
                                            ISSUE PROPERTIES
                                        </span>
                                        <h3>Details</h3>
                                    </div>
                                </div>

                                <div className="issue-property-list">
                                    <div className="issue-property-row">
                                        <span>Assignee</span>
                                        <strong>{assigneeName}</strong>
                                    </div>

                                    <div className="issue-property-row">
                                        <span>Creator</span>
                                        <strong>{creatorName}</strong>
                                    </div>

                                    <div className="issue-property-row">
                                        <span>Priority</span>
                                        <PriorityBadge priority={issue?.priority} />
                                    </div>

                                    <div className="issue-property-row">
                                        <span>Project</span>
                                        <strong>{projectName}</strong>
                                        {projectId && (
                                            <Link to={`/projects/${projectId}`}>
                                                View project →
                                            </Link>
                                        )}
                                    </div>

                                    <div className="issue-property-row">
                                        <span>Status</span>
                                        <StatusBadge status={issue?.status} />
                                    </div>

                                    <div className="issue-property-row">
                                        <span>Deadline</span>
                                        <strong>{deadline}</strong>
                                    </div>
                                </div>
                            </section>

                            <section className="detail-panel issue-workflow-panel">
                                <div className="issue-detail-section-heading compact">
                                    <div>
                                        <span className="app-eyebrow">
                                            WORKFLOW HEALTH
                                        </span>
                                        <h3>Progress</h3>
                                    </div>
                                    <span className="workflow-health-dot">●</span>
                                </div>

                                <div className="issue-workflow-summary">
                                    <strong>
                                        {issue?.status === "closed"
                                            ? "Closed"
                                            : issue?.status === "resolved"
                                                ? "Resolved"
                                                : issue?.status === "in-progress"
                                                    ? "In Progress"
                                                    : "Open"}
                                    </strong>
                                    <span>
                                        Current issue workflow status
                                    </span>
                                </div>

                                <ProgressBar value={workflowProgress} />

                                <div className="issue-workflow-meta">
                                    <span>Workflow progress</span>
                                    <strong>{workflowProgress}%</strong>
                                </div>
                            </section>

                            <section className="detail-panel issue-project-panel">
                                <span className="app-eyebrow">PROJECT CONTEXT</span>
                                <strong>{projectName}</strong>
                                <p>
                                    This issue belongs to the project workflow shown
                                    above and can be reviewed alongside its project
                                    progress and team context.
                                </p>

                                {projectId && (
                                    <Link
                                        to={`/projects/${projectId}`}
                                        className="secondary-button"
                                    >
                                        Open Project
                                        <span>↗</span>
                                    </Link>
                                )}
                            </section>
                        </aside>
                    </div>
                </section>
            </PageState>
        </AppShell>
    );
}

function TeamPage({ theme, onToggleTheme }) {
    const [members, setMembers] = useState([]);
    const [issues, setIssues] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [workError, setWorkError] = useState("");
    const [query, setQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const loadTeam = async () => {
        setLoading(true);
        setError("");
        setWorkError("");

        try {
            const [memberData, issueData, projectData] = await Promise.all([
                apiRequest("/users"),
                apiRequest("/issues?page=1&limit=100"),
                apiRequest("/projects"),
            ]);

            setMembers(Array.isArray(memberData) ? memberData : memberData.users || []);
            setIssues(Array.isArray(issueData) ? issueData : issueData.issues || []);
            setProjects(Array.isArray(projectData) ? projectData : projectData.projects || []);
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTeam();
    }, []);

    const developers = members.filter(
        (member) => (member.role || "developer").toLowerCase() === "developer"
    );
    const admins = members.filter(
        (member) => (member.role || "developer").toLowerCase() === "admin"
    );

    const normalizedQuery = query.trim().toLowerCase();
    const visible = members.filter((member) => {
        const role = (member.role || "developer").toLowerCase();
        const searchableText = `${member.name || ""} ${member.email || ""} ${role}`.toLowerCase();
        const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
        const matchesRole = roleFilter === "all" || role === roleFilter;
        return matchesQuery && matchesRole;
    });

    const getMemberInitials = (member) => {
        const name = member?.name || member?.email || "User";
        const parts = name.trim().split(/\s+/).filter(Boolean);
        if (parts.length > 1) {
            return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
        }
        return name.charAt(0).toUpperCase();
    };

    const getRoleLabel = (member) => {
        const role = member?.role || "developer";
        return role.charAt(0).toUpperCase() + role.slice(1);
    };

    const getMemberWork = (member) => {
        const memberId = member?._id || member?.id || "";
        const memberEmail = String(member?.email || "").toLowerCase();

        const assignedIssues = issues.filter((issue) => {
            const assignee = issue?.assignedTo;

            if (!assignee) {
                return false;
            }

            if (typeof assignee === "string") {
                return (
                    String(assignee) === String(memberId) ||
                    String(assignee).toLowerCase() === memberEmail
                );
            }

            const assigneeId = assignee?._id || assignee?.id || assignee?.userId || "";
            const assigneeEmail = String(assignee?.email || "").toLowerCase();

            return (
                (memberId && assigneeId && String(assigneeId) === String(memberId)) ||
                (memberEmail && assigneeEmail && assigneeEmail === memberEmail)
            );
        });

        const projectMap = new Map();

        assignedIssues.forEach((issue) => {
            const project = issue?.project;

            if (project && typeof project === "object") {
                const projectId = project._id || project.id || project.name;
                if (projectId) {
                    projectMap.set(String(projectId), {
                        id: project._id || project.id || "",
                        name: project.name || "Untitled Project",
                    });
                }
                return;
            }

            if (project) {
                const matchingProject = projects.find(
                    (item) => String(item?._id || item?.id) === String(project)
                );

                if (matchingProject) {
                    projectMap.set(String(matchingProject._id || matchingProject.id), {
                        id: matchingProject._id || matchingProject.id,
                        name: matchingProject.name || "Untitled Project",
                    });
                }
            }
        });

        return {
            issues: assignedIssues,
            projects: Array.from(projectMap.values()),
        };
    };

    const getIssueKey = (issue) => issue?.key || issue?.issueKey || `DT-${String(issue?._id || issue?.id || "").slice(-4)}`;

    const formatIssueStatus = (status) =>
        String(status || "open").replace("-", " ");

    return (
        <AppShell
            theme={theme}
            onToggleTheme={onToggleTheme}
            title="Team & Collaborators"
            eyebrow="WORKSPACE · COLLABORATION"
        >
            <section className="team-page-intro">
                <div className="team-page-intro-copy">
                    <span className="app-eyebrow">TEAM DIRECTORY</span>
                    <h2>Manage your development team.</h2>
                    <p>
                        View workspace members, understand role distribution, and
                        navigate to the work connected to your team.
                    </p>
                </div>
                <div className="team-page-actions">
                    <span className="team-sync-status">
                        <span /> Workspace synced
                    </span>
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={loadTeam}
                        disabled={loading}
                    >
                        ↻ Refresh Members
                    </button>
                </div>
            </section>

            <section className="app-stat-grid team-stats team-template-stats">
                <StatCard
                    label="Total Members"
                    value={members.length}
                    meta="Workspace users"
                    tone="blue"
                    icon="♧"
                />
                <StatCard
                    label="Developers"
                    value={developers.length}
                    meta="Developer accounts"
                    tone="cyan"
                    icon="◆"
                />
                <StatCard
                    label="Administrators"
                    value={admins.length}
                    meta="Workspace administrators"
                    tone="purple"
                    icon="⚙"
                />
                <StatCard
                    label="Role Distribution"
                    value={members.length ? `${developers.length}/${admins.length}` : "—"}
                    meta="Developers / Admins"
                    tone="green"
                    icon="◉"
                />
            </section>

            <section className="team-directory-panel">
                <div className="team-directory-heading">
                    <div>
                        <span className="app-eyebrow">COLLABORATOR DIRECTORY</span>
                        <h3>Workspace members</h3>
                        <p>
                            Search by name or email and filter members by their workspace role.
                        </p>
                    </div>
                    <span className="toolbar-count">
                        {visible.length} of {members.length} members
                    </span>
                </div>

                <div className="list-toolbar team-directory-toolbar">
                    <div className="list-search team-search">
                        <span aria-hidden="true">⌕</span>
                        <input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search collaborators by name or email..."
                            aria-label="Search collaborators"
                        />
                        <kbd>/</kbd>
                    </div>
                    <div className="team-filter-controls">
                        <label className="team-role-filter">
                            <span>Role</span>
                            <select
                                value={roleFilter}
                                onChange={(event) => setRoleFilter(event.target.value)}
                                aria-label="Filter team members by role"
                            >
                                <option value="all">All roles</option>
                                <option value="developer">Developers</option>
                                <option value="admin">Administrators</option>
                            </select>
                        </label>
                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() => {
                                setQuery("");
                                setRoleFilter("all");
                            }}
                            disabled={!query && roleFilter === "all"}
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </section>

            <PageState loading={loading} error={error} onRetry={loadTeam}>
                <section className="team-results-section">
                    <div className="team-results-heading">
                        <div>
                            <span className="app-eyebrow">MEMBER WORKSPACES</span>
                            <h3>
                                {visible.length ? "Your collaborators" : "No collaborators found"}
                            </h3>
                        </div>
                        <span>{visible.length} visible</span>
                    </div>

                    {workError && (
                        <div className="team-work-warning">
                            <span>!</span>
                            <p>{workError}</p>
                        </div>
                    )}

                    {visible.length ? (
                        <div className="team-card-grid team-template-grid">
                            {visible.map((member, index) => {
                                const memberKey = member._id || member.id || member.email || index;
                                const role = member.role || "developer";
                                const memberWork = getMemberWork(member);
                                const assignedIssues = memberWork.issues;
                                const assignedProjects = memberWork.projects;

                                return (
                                    <article className="team-card team-template-card" key={memberKey}>
                                        <div className="team-card-header">
                                            <div className="team-member-identity">
                                                <div>
                                                    <strong>{member.name || "Unnamed member"}</strong>
                                                    <span>{member.email || "No email available"}</span>
                                                </div>
                                            </div>
                                            <span className={`role-badge ${role}`}>
                                                {getRoleLabel(member)}
                                            </span>
                                        </div>

                                        <div className="team-member-status-row">
                                            <span className="member-status">
                                                <span /> Workspace member
                                            </span>
                                            <span className="member-index">
                                                {assignedIssues.length} assigned {assignedIssues.length === 1 ? "issue" : "issues"}
                                            </span>
                                        </div>

                                        <div className="team-member-work-section">
                                            <div className="team-work-section-header">
                                                <span>ASSIGNED PROJECTS</span>
                                                <strong>{assignedProjects.length}</strong>
                                            </div>

                                            {assignedProjects.length ? (
                                                <div className="team-project-list">
                                                    {assignedProjects.slice(0, 3).map((project) => (
                                                        <Link
                                                            to={project.id ? `/projects/${project.id}` : "/projects"}
                                                            className="team-project-chip"
                                                            key={project.id || project.name}
                                                        >
                                                            <span>▣</span>
                                                            {project.name}
                                                            <span>↗</span>
                                                        </Link>
                                                    ))}
                                                    {assignedProjects.length > 3 && (
                                                        <span className="team-more-count">
                                                            +{assignedProjects.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="team-no-work">
                                                    No project assignments yet.
                                                </div>
                                            )}
                                        </div>

                                        <div className="team-member-work-section team-issues-section">
                                            <div className="team-work-section-header">
                                                <span>ASSIGNED ISSUES</span>
                                                <strong>{assignedIssues.length}</strong>
                                            </div>

                                            {assignedIssues.length ? (
                                                <div className="team-issue-list">
                                                    {assignedIssues.slice(0, 3).map((issue, issueIndex) => (
                                                        <Link
                                                            to={`/issues/${issue._id || issue.id}`}
                                                            className="team-assigned-issue"
                                                            key={issue._id || issue.id || issueIndex}
                                                        >
                                                            <div className="team-assigned-issue-main">
                                                                <span className="team-issue-key">
                                                                    {getIssueKey(issue)}
                                                                </span>
                                                                <strong>{issue.title || "Untitled issue"}</strong>
                                                            </div>
                                                            <div className="team-assigned-issue-meta">
                                                                <StatusBadge status={issue.status || "open"} />
                                                                <PriorityBadge priority={issue.priority || "medium"} />
                                                            </div>
                                                        </Link>
                                                    ))}
                                                    {assignedIssues.length > 3 && (
                                                        <span className="team-more-count">
                                                            +{assignedIssues.length - 3} more assigned issues
                                                        </span>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="team-no-work">
                                                    No issues currently assigned.
                                                </div>
                                            )}
                                        </div>

                                        <div className="team-card-footer">
                                            <span>
                                                {assignedIssues.length
                                                    ? `${assignedIssues.length} active work item${assignedIssues.length === 1 ? "" : "s"}`
                                                    : "Available for new work"}
                                            </span>
                                            <div className="team-card-actions">
                                                <Link
                                                    to={
                                                        member._id || member.id
                                                            ? `/issues?assignTo=${encodeURIComponent(member._id || member.id)}`
                                                            : "/issues"
                                                    }
                                                    className="team-assign-work-button"
                                                >
                                                    ＋ Assign New Work
                                                </Link>
                                                <Link
                                                    to={
                                                        assignedIssues.length
                                                            ? `/issues?assignedTo=${member._id || member.id}`
                                                            : "/issues"
                                                    }
                                                    className="team-view-work-link"
                                                >
                                                    View assigned issues →
                                                </Link>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="app-state-card empty-state compact-state">
                            <span className="state-icon">♧</span>
                            <strong>No collaborators found.</strong>
                            <span>
                                Try changing your search or role filter, or refresh the workspace members.
                            </span>
                            <button
                                type="button"
                                className="secondary-button"
                                onClick={() => {
                                    setQuery("");
                                    setRoleFilter("all");
                                }}
                            >
                                Reset Directory
                            </button>
                        </div>
                    )}
                </section>
            </PageState>
        </AppShell>
    );
}

function SettingsPage({ theme, onToggleTheme }) {
    const navigate = useNavigate();
    const { user } = getStoredAuth();
    const [activeTab, setActiveTab] = useState("profile");

    const logout = () => {
        clearAuth();
        navigate("/login", { replace: true });
    };

    const displayName = user?.name || "Developer";
    const displayEmail = user?.email || "developer@devtrack.local";
    const displayRole = user?.role || "developer";
    const initial = displayName.charAt(0).toUpperCase();

    const settingsTabs = [
        ["profile", "◉ Profile"],
        ["security", "◇ Security & API"],
        ["preferences", "⚙ Preferences"],
        ["workspace", "▣ API Tokens & Workspace"],
        ["notifications", "◌ Notifications"],
    ];

    return (
        <AppShell
            theme={theme}
            onToggleTheme={onToggleTheme}
            title="Settings"
            eyebrow="DEVTRACK · ACCOUNT & PREFERENCES"
        >
            <section className="settings-page-intro">
                <div>
                    <span className="app-eyebrow">ACCOUNT CONTROL CENTER</span>
                    <p>
                        Manage your profile, security, workspace preferences, and
                        connected workflow from one place.
                    </p>
                </div>
                <div className="settings-actions">
                    <span className="settings-saved">
                        <span className="settings-status-dot" />
                        Settings ready
                    </span>
                    <button
                        type="button"
                        className="secondary-button"
                        onClick={() => window.location.reload()}
                    >
                        ↻ Refresh
                    </button>
                </div>
            </section>

            <nav className="settings-tabs" aria-label="Settings sections">
                {settingsTabs.map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        className={activeTab === key ? "active" : ""}
                        onClick={() => setActiveTab(key)}
                    >
                        {label}
                    </button>
                ))}
            </nav>

            <div className="settings-layout">
                <section className="settings-main">
                    {activeTab === "profile" && (
                        <div className="settings-panel settings-profile-panel">
                            <div className="settings-panel-heading">
                                <div>
                                    <span className="app-eyebrow">PUBLIC IDENTITY</span>
                                    <h2>Profile</h2>
                                    <p>
                                        Manage the profile information used across
                                        your DevTrack workspace.
                                    </p>
                                </div>
                                <span className="settings-badge">
                                    <span className="settings-badge-dot" />
                                    Verified
                                </span>
                            </div>

                            <div className="settings-profile-identity">
                                <div className="settings-profile-avatar">{initial}</div>
                                <div className="settings-profile-copy">
                                    <strong>{displayName}</strong>
                                    <span>{displayEmail}</span>
                                    <small>
                                        Auto-synced with your DevTrack workspace
                                        account.
                                    </small>
                                </div>
                                <span className="role-badge">{displayRole}</span>
                            </div>

                            <div className="settings-section-label">
                                <span>ACCOUNT DETAILS</span>
                                <small>Read-only workspace identity</small>
                            </div>

                            <div className="settings-field-grid">
                                <div className="settings-field">
                                    <label>Full Name</label>
                                    <div className="readonly-field">{displayName}</div>
                                </div>
                                <div className="settings-field">
                                    <label>Email</label>
                                    <div className="readonly-field">{displayEmail}</div>
                                </div>
                                <div className="settings-field">
                                    <label>Role</label>
                                    <div className="readonly-field">{displayRole}</div>
                                </div>
                                <div className="settings-field">
                                    <label>Workspace</label>
                                    <div className="readonly-field">DevTrack Workspace</div>
                                </div>
                            </div>

                            <div className="settings-field settings-field-full">
                                <label>Workspace Profile</label>
                                <div className="readonly-field settings-readonly-large">
                                    Developer-focused project and issue management
                                    workspace.
                                </div>
                            </div>

                            <div className="settings-note">
                                Profile editing can be connected to the user update
                                API when editable profile fields are added to the
                                backend contract.
                            </div>

                            <div className="settings-connected-account">
                                <div className="settings-connected-icon">◆</div>
                                <div>
                                    <strong>DevTrack workspace account</strong>
                                    <span>{displayEmail}</span>
                                </div>
                                <span className="settings-connected-status">
                                    Connected
                                </span>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="settings-panel">
                            <div className="settings-panel-heading">
                                <div>
                                    <span className="app-eyebrow">ACCOUNT SECURITY</span>
                                    <h2>Security & API</h2>
                                    <p>
                                        Review authentication state and your current
                                        workspace access.
                                    </p>
                                </div>
                                <span className="settings-badge">
                                    <span className="settings-badge-dot" />
                                    Protected
                                </span>
                            </div>

                            <div className="security-list">
                                <div className="security-item">
                                    <div className="security-item-icon">✓</div>
                                    <div>
                                        <span>Authentication</span>
                                        <strong>JWT protected</strong>
                                        <small>
                                            Authenticated API requests use your
                                            DevTrack access token.
                                        </small>
                                    </div>
                                    <span className="settings-inline-status">Active</span>
                                </div>

                                <div className="security-item">
                                    <div className="security-item-icon">◉</div>
                                    <div>
                                        <span>Session</span>
                                        <strong>Active session</strong>
                                        <small>
                                            Your current browser session is connected
                                            to DevTrack.
                                        </small>
                                    </div>
                                    <span className="settings-inline-status">Live</span>
                                </div>

                                <div className="security-item">
                                    <div className="security-item-icon">◇</div>
                                    <div>
                                        <span>API Base</span>
                                        <strong>{API_BASE_URL}</strong>
                                        <small>
                                            Configured through the frontend
                                            environment.
                                        </small>
                                    </div>
                                    <span className="settings-inline-status">Ready</span>
                                </div>
                            </div>

                            <div className="settings-security-footer">
                                <div>
                                    <span className="app-eyebrow">SESSION CONTROL</span>
                                    <strong>Sign out from this device</strong>
                                    <p>
                                        End the current DevTrack session and return to
                                        the login screen.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    className="danger-button"
                                    onClick={logout}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === "preferences" && (
                        <div className="settings-panel">
                            <div className="settings-panel-heading">
                                <div>
                                    <span className="app-eyebrow">WORKSPACE EXPERIENCE</span>
                                    <h2>Preferences</h2>
                                    <p>
                                        Control the visual experience of your DevTrack
                                        workspace.
                                    </p>
                                </div>
                            </div>

                            <div className="settings-preference-list">
                                <div className="preference-row">
                                    <div>
                                        <strong>Theme</strong>
                                        <span>
                                            Switch between the DevTrack dark and light
                                            experience.
                                        </span>
                                    </div>
                                    <ThemeToggle
                                        theme={theme}
                                        onToggle={onToggleTheme}
                                    />
                                </div>

                                <div className="preference-row">
                                    <div>
                                        <strong>Motion</strong>
                                        <span>
                                            Scroll reveals, cursor ambience, and
                                            interactive transitions remain enabled
                                            where supported.
                                        </span>
                                    </div>
                                    <span className="settings-badge">Enabled</span>
                                </div>

                                <div className="preference-row">
                                    <div>
                                        <strong>Workspace status</strong>
                                        <span>
                                            Keep the workspace operational state visible
                                            across the application shell.
                                        </span>
                                    </div>
                                    <span className="toggle-pill on">On</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "workspace" && (
                        <div className="settings-panel">
                            <div className="settings-panel-heading">
                                <div>
                                    <span className="app-eyebrow">DEVELOPER WORKSPACE</span>
                                    <h2>API Tokens & Workspace</h2>
                                    <p>
                                        Developer-facing configuration for integrations
                                        and future automation.
                                    </p>
                                </div>
                            </div>

                            <div className="token-card">
                                <span className="token-icon">◆</span>
                                <div>
                                    <strong>DevTrack API access</strong>
                                    <p>
                                        JWT authentication is active for protected
                                        workspace endpoints.
                                    </p>
                                </div>
                                <span className="settings-badge">Connected</span>
                            </div>

                            <div className="settings-workspace-grid">
                                <div>
                                    <span className="app-eyebrow">WORKSPACE</span>
                                    <strong>DevTrack Workspace</strong>
                                    <small>Primary development workspace</small>
                                </div>
                                <div>
                                    <span className="app-eyebrow">API STATUS</span>
                                    <strong>Protected</strong>
                                    <small>JWT-backed API requests enabled</small>
                                </div>
                            </div>

                            <div className="settings-note">
                                Token creation and revocation should remain
                                server-controlled. The frontend will surface those
                                controls once the backend exposes a dedicated token
                                contract.
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="settings-panel">
                            <div className="settings-panel-heading">
                                <div>
                                    <span className="app-eyebrow">WORKFLOW SIGNALS</span>
                                    <h2>Notifications</h2>
                                    <p>
                                        Prepare notification preferences for issue,
                                        project, and collaboration events.
                                    </p>
                                </div>
                            </div>

                            <div className="settings-preference-list">
                                <div className="preference-row">
                                    <div>
                                        <strong>Issue activity</strong>
                                        <span>
                                            Surface assignment, status, and comment
                                            changes.
                                        </span>
                                    </div>
                                    <span className="toggle-pill on">On</span>
                                </div>

                                <div className="preference-row">
                                    <div>
                                        <strong>Project activity</strong>
                                        <span>
                                            Surface project milestone and progress
                                            updates.
                                        </span>
                                    </div>
                                    <span className="toggle-pill on">On</span>
                                </div>

                                <div className="preference-row">
                                    <div>
                                        <strong>Agent suggestions</strong>
                                        <span>
                                            Allow contextual workflow recommendations.
                                        </span>
                                    </div>
                                    <span className="toggle-pill on">On</span>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                <aside className="settings-side">
                    <div className="settings-side-card settings-security-card">
                        <div className="settings-side-card-heading">
                            <span className="app-eyebrow">ACCOUNT SECURITY</span>
                            <span className="settings-side-status">SECURE</span>
                        </div>
                        <strong>Workspace protected</strong>
                        <span>JWT authentication active</span>
                        <div className="settings-security-metrics">
                            <div>
                                <span>Workspace</span>
                                <strong>Active</strong>
                            </div>
                            <div>
                                <span>Access</span>
                                <strong>JWT</strong>
                            </div>
                            <div>
                                <span>Session</span>
                                <strong>Live</strong>
                            </div>
                        </div>
                    </div>

                    <div className="settings-side-card">
                        <span className="app-eyebrow">QUICK COMMANDS</span>
                        <div className="settings-quick-links">
                            <Link to="/dashboard">
                                <span>◈</span>
                                <span>Open Dashboard</span>
                                <strong>→</strong>
                            </Link>
                            <Link to="/projects">
                                <span>▣</span>
                                <span>Manage Projects</span>
                                <strong>→</strong>
                            </Link>
                            <Link to="/issues">
                                <span>◇</span>
                                <span>Review Issues</span>
                                <strong>→</strong>
                            </Link>
                        </div>
                    </div>

                    <div className="settings-side-card agent-mini">
                        <span className="agent-logo">◆</span>
                        <span className="app-eyebrow">DEVTRACK AGENT</span>
                        <strong>Contextual assistance</strong>
                        <span>
                            Use project-aware guidance from the workspace.
                        </span>
                        <Link to="/dashboard#agent">Open Agent Context →</Link>
                    </div>
                </aside>
            </div>

            <section className="danger-zone">
                <div>
                    <span className="app-eyebrow">DANGER ZONE</span>
                    <h3>Workspace access</h3>
                    <p>
                        Sign out of the current DevTrack session on this device.
                    </p>
                </div>
                <button
                    type="button"
                    className="danger-button"
                    onClick={logout}
                >
                    Sign Out
                </button>
            </section>
        </AppShell>
    );
}

function ProtectedRoute({ children }) {
    const { token } = getStoredAuth();
    return token ? children : <Navigate to="/login" replace />;
}
function NotFoundPage({ theme, onToggleTheme }) {
    return (
        <div className="not-found-page">
            <div className="not-found-grid" />
            <div className="not-found-card">
                <div className="app-brand"><DevTrackMark /><span className="brand-name">DevTrack</span><span className="brand-version">404</span></div>
                <span className="app-eyebrow">ROUTE NOT FOUND</span>
                <h1>That workspace doesn't exist.</h1>
                <p>The route you requested isn't available in the current DevTrack application.</p>
                <div className="not-found-actions"><Link to="/" className="secondary-button">Landing Page</Link><Link to="/dashboard" className="primary-button">Open Dashboard</Link><ThemeToggle theme={theme} onToggle={onToggleTheme} /></div>
            </div>
        </div>
    );
}
function App() {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("devtrack-theme");
        return savedTheme === "light" ? "light" : "dark";
    });
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("devtrack-theme", theme);
        document.documentElement.classList.add("theme-transition");
        const timeout = window.setTimeout(() => {
            document.documentElement.classList.remove("theme-transition");
        }, 450);
        return () => window.clearTimeout(timeout);
    }, [theme]);
    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");
    };
    const pageProps = { theme, onToggleTheme: toggleTheme };
    return (
        <Routes>
            <Route path="/" element={<LandingPage {...pageProps} />} />
            <Route path="/login" element={<LoginPage {...pageProps} />} />
            <Route path="/register" element={<RegisterPage {...pageProps} />} />
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage {...pageProps} /></ProtectedRoute>} />
            <Route path="/projects" element={<ProtectedRoute><ProjectsPage {...pageProps} /></ProtectedRoute>} />
            <Route path="/projects/:id" element={<ProtectedRoute><ProjectDetailsPage {...pageProps} /></ProtectedRoute>} />
            <Route path="/issues" element={<ProtectedRoute><IssuesPage {...pageProps} /></ProtectedRoute>} />
            <Route path="/issues/:id" element={<ProtectedRoute><IssueDetailsPage {...pageProps} /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><TeamPage {...pageProps} /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage {...pageProps} /></ProtectedRoute>} />
            <Route path="/404" element={<NotFoundPage {...pageProps} />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
    );
}
export default App;