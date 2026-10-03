

# CollabOS — Frontend Learning Notes

### Session 1 — October 3, 2026

## 1. React Concepts

### Components

Components are reusable pieces of UI.

Example:

```jsx
function Dashboard() {
  return <h1>Dashboard</h1>;
}
```

### Props

Props allow a parent component to pass information to a child component.

```jsx
function Button({ children }) {
  return <button>{children}</button>;
}
```

### `children`

`children` represents whatever is placed between a component's opening and closing tags.

```jsx
<Button>
  Create Project
</Button>
```

Inside `Button`, `"Create Project"` is available through:

```jsx
children
```

---

## 2. Reusable UI Components

We created:

```text
src/components/
├── ui/
│   ├── Button.jsx
│   ├── Card.jsx
│   └── Badge.jsx
└── layout/
    ├── AppLayout.jsx
    └── Sidebar.jsx
```

### Button

We used a `variant` prop:

```jsx
function Button({ children, variant = "primary" }) {
  const variants = {
    primary: "...",
    secondary: "...",
  };

  return (
    <button className={variants[variant]}>
      {children}
    </button>
  );
}
```

Important pattern:

```text
prop → lookup object → UI
```

---

## 3. Badge Variants

We extended the Badge component with:

```jsx
const variants = {
  success: "...",
  warning: "...",
  error: "...",
  neutral: "...",
  info: "...",
};
```

Then:

```jsx
variants[variant]
```

selects the appropriate styling.

This is useful because instead of creating five different Badge components, we create **one reusable component**.

---

# 4. Tailwind CSS

We learned that Tailwind classes describe CSS directly in the JSX.

### Layout

```text
flex          → enable Flexbox
flex-col      → arrange children vertically
items-center  → align items on cross axis
justify-center → center on main axis
justify-between → push items apart
gap-4         → spacing between children
```

### Spacing

```text
p-4   → padding
px-4  → horizontal padding
py-2  → vertical padding

m-4   → margin
mt-4  → margin-top
mb-4  → margin-bottom
```

### Colors

```text
bg-slate-950
bg-slate-900
bg-slate-800

text-white
text-slate-300
text-slate-400
```

### Borders / Radius

```text
border
border-slate-800

rounded-lg
rounded-xl
rounded-full
```

### Typography

```text
text-sm
text-lg
text-3xl
text-4xl

font-medium
font-semibold
font-bold
```

### Hover

```text
hover:bg-slate-800
hover:text-white
```

---

# 5. Important Flexbox Lesson

We initially had:

```jsx
<div className="flex items-center justify-center">
```

`flex` defaults to a **row**.

So children appear like:

```text
Heading   Button
```

Adding:

```text
flex-col
```

changes the direction:

```text
Heading
Button
```

This was one of the important Tailwind/Flexbox concepts from today.

---

# 6. App Layout

Our layout became:

```text
App
└── AppLayout
    ├── Sidebar
    ├── Navbar
    └── Main Content
```

The important Tailwind structure was:

```jsx
<div className="flex min-h-screen">
  <aside className="w-64">
    Sidebar
  </aside>

  <div className="flex flex-1 flex-col">
    <header>
      Navbar
    </header>

    <main className="flex-1 p-6">
      Content
    </main>
  </div>
</div>
```

### Key concepts

```text
w-64        → fixed sidebar width
flex-1      → take remaining available space
min-h-screen → at least viewport height
flex-col    → stack navbar/content vertically
```

---

# 7. Data-Driven Sidebar

Instead of writing every navigation link manually, we created an array:

```jsx
const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Projects",
    icon: FolderKanban,
    path: "/projects",
  },
  {
    name: "Workspace",
    icon: BriefcaseBusiness,
    path: "/workspace",
  },
  {
    name: "Escrows",
    icon: WalletCards,
    path: "/escrows",
  },
];
```

Then:

```jsx
navigation.map((item) => (
  // render navigation item
))
```

This taught an important React pattern:

```text
Data
 ↓
.map()
 ↓
Repeated Components
```

### `key`

When rendering lists:

```jsx
key={item.name}
```

helps React identify each item.

---

# 8. Lucide Icons

We installed `lucide-react` and imported icons:

```jsx
import {
  LayoutDashboard,
  FolderKanban,
  BriefcaseBusiness,
  WalletCards,
} from "lucide-react";
```

Icons are React components.

We can store them in data:

```jsx
{
  name: "Projects",
  icon: FolderKanban,
}
```

and render them dynamically:

```jsx
<item.icon size={18} />
```

That's another useful pattern:

```text
Data can contain Components
```

---

# 9. React Router — Next Step

We reached the point where the sidebar URLs exist, but aren't actually connected to pages.

For example:

```jsx
<a href="/projects">
```

changes the URL, but we haven't configured React Router yet.

The next lesson is:

```text
BrowserRouter
Routes
Route
Link
Outlet
```

We'll create pages:

```text
src/pages/
├── Dashboard.jsx
├── Projects.jsx
├── Workspace.jsx
├── Escrows.jsx
└── Settings.jsx
```

Then connect them with React Router.

---

# 10. Git

At the end of the session you also hit this:

```bash
git add.
```

Git interpreted `add.` as a command.

Correct:

```bash
git add .
```

Then:

```bash
git status
git commit -m "Build frontend layout components"
git push
```

Remember:

```text
git add .     → stage changes
git commit    → create a snapshot
git push      → send commits to GitHub
```

---

# 🧠 Things to Remember

### React

* Components are reusable UI pieces.
* Props pass information into components.
* `children` represents content placed inside a component.
* Components can use variants.
* `.map()` turns arrays of data into repeated UI.
* Lists rendered with `.map()` need a `key`.

### Tailwind

* `flex` enables Flexbox.
* `flex-col` changes direction to vertical.
* `items-center` controls cross-axis alignment.
* `justify-center` controls main-axis alignment.
* `gap-*` adds spacing.
* `p-*` controls padding.
* `m-*` controls margin.
* `bg-*` controls background.
* `text-*` controls text.
* `font-*` controls font weight.
* `hover:*` applies hover styles.

### Architecture

```text
App
└── AppLayout
    ├── Sidebar
    ├── Navbar
    └── Main
```

### Important Pattern

```text
Data → map() → Components
```

---

# 🚀 Next Session

**React Router**

We'll build it step-by-step:

1. Create the page components
2. Add `BrowserRouter`
3. Add `Routes`
4. Add `Route`
5. Replace `<a>` with `<Link>`
6. Add `<Outlet />`
7. Test navigation between pages
8. Understand how routing actually works

That is exactly where we stopped today.
