import { Toaster as Sonner } from "sonner"

const Toaster = ({
  ...props
}) => {
  return (
    <Sonner
      theme="light" // Force light mode for consistency with the corporate theme
      className="toaster group"
      richColors={true} // 🟢 Adds beautiful semantic colors (Green/Red/Blue)
      position="top-right" // ↗️ Standard position for desktop apps
      closeButton={true} // ❌ Adds a small X to dismiss
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-slate-950 group-[.toaster]:border-slate-200 group-[.toaster]:shadow-2xl group-[.toaster]:rounded-xl group-[.toaster]:font-sans",
          description: "group-[.toast]:text-slate-500 font-medium",
          actionButton:
            "group-[.toast]:bg-brand-red group-[.toast]:text-white font-bold",
          cancelButton:
            "group-[.toast]:bg-slate-100 group-[.toast]:text-slate-500",
          // Custom overrides for Rich Colors to match our specific palette if needed
          error: "group-[.toaster]:!bg-red-50 group-[.toaster]:!border-red-100 group-[.toaster]:!text-red-800",
          success: "group-[.toaster]:!bg-green-50 group-[.toaster]:!border-green-100 group-[.toaster]:!text-green-800",
          warning: "group-[.toaster]:!bg-yellow-50 group-[.toaster]:!border-yellow-100 group-[.toaster]:!text-yellow-800",
          info: "group-[.toaster]:!bg-blue-50 group-[.toaster]:!border-blue-100 group-[.toaster]:!text-blue-800",
        },
      }}
      {...props} />
  );
}

export { Toaster }