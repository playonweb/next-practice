export function DataDisplay({ user, posts }: { user: any, posts: any }) {
  return (
    <div className="space-y-4">
      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
        <span className="text-xs font-bold text-slate-500 uppercase block mb-1">User Profile</span>
        <span className="text-slate-200">{user.name} ({user.role})</span>
      </div>
      <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
        <span className="text-xs font-bold text-slate-500 uppercase block mb-1">Posts</span>
        <span className="text-slate-200">{posts.length} items retrieved</span>
      </div>
    </div>
  );
}
