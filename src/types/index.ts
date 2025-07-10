// Common types for the application
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  credits: number;
  lastActive: string;
}

export interface Sequence {
  id: string;
  name: string;
  description?: string;
  steps: SequenceStep[];
  status: 'active' | 'inactive' | 'draft';
  created: string;
  updated: string;
}

export interface SequenceStep {
  id: string;
  type: 'email' | 'delay' | 'linkedin' | 'call';
  content: string;
  delay?: number;
  conditions?: string[];
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  phone?: string;
  title: string;
  company: string;
  location?: string;
  saved: boolean;
  logo?: string;
}

export interface Company {
  id: number;
  name: string;
  industry: string;
  size: string;
  location?: string;
  founded?: string;
  website?: string;
  linkedin?: string;
  saved: boolean;
}

export interface ComponentProps {
  isDarkMode: boolean;
}

export interface LayoutProps extends ComponentProps {
  children: React.ReactNode;
  toggleDarkMode: () => void;
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
  showWebsiteFilters: boolean;
  toggleWebsiteFilters: () => void;
}

export interface DashboardProps extends ComponentProps {
  showWebsiteFilters?: boolean;
  searchFiltersVisible?: boolean;
  toggleSearchFiltersVisibility?: () => void;
}

export interface UserManagementProps extends ComponentProps {
  // Add specific props for user management
}

export interface BillingProps extends ComponentProps {
  // Add specific props for billing
}

export interface SequenceProps extends ComponentProps {
  sequences: Sequence[];
  addSequence: (sequence: Sequence) => void;
  addStep?: (sequenceId: string, step: SequenceStep) => void;
}

export interface ModalProps extends ComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}

export interface TableProps extends ComponentProps {
  results: Contact[] | Company[];
  openProfileModal: (profile: Contact) => void;
  openCompanyModal: (company: Company) => void;
  handleSave: (item: Contact | Company) => void;
  activeTab: string;
}

export interface FilterProps extends ComponentProps {
  activeTab: string;
  isVisible: boolean;
  toggleVisibility: () => void;
}

export interface SidebarProps extends ComponentProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  showWebsiteFilters: boolean;
  toggleWebsiteFilters: () => void;
}