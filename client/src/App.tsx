import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageSwitcher } from "@/components/common/language-switcher";
import { Chatbot } from "@/components/common/chatbot";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import ISOCourses from "@/pages/iso-courses";
import ISODetail from "@/pages/iso-detail";
import TrainingServices from "@/pages/training-services";
import Blog from "@/pages/blog";
import Contact from "@/pages/contact";
import Consultation from "@/pages/consultation";
import Quote from "@/pages/quote";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/iso-courses" component={ISOCourses} />
          <Route path="/iso-courses/:id" component={ISODetail} />
          <Route path="/training-services" component={TrainingServices} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:id" component={Blog} />
          <Route path="/contact" component={Contact} />
          <Route path="/consultation" component={Consultation} />
          <Route path="/quote" component={Quote} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <LanguageSwitcher />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
