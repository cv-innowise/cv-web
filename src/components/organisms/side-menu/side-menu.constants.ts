import {
  ContactPageOutlined,
  Domain,
  FolderCopyOutlined,
  Group,
  Translate,
  TrendingUp,
  WorkOutline
} from '@mui/icons-material'
import { Divider } from '@mui/material'
import { routes } from 'constants/routes'

export const adminLinks = [
  {
    IconComponent: Group,
    name: 'users',
    to: routes.users.root
  },
  {
    IconComponent: FolderCopyOutlined,
    name: 'projects',
    to: routes.projects.root
  },
  {
    IconComponent: ContactPageOutlined,
    name: 'cvs',
    to: routes.cvs.root
  },
  {
    DividerComponent: Divider,
    name: 'secondary-entities'
  },
  {
    IconComponent: Domain,
    name: 'departments',
    to: routes.departments
  },
  {
    IconComponent: WorkOutline,
    name: 'positions',
    to: routes.positions
  },
  {
    IconComponent: TrendingUp,
    name: 'skills',
    to: routes.skills
  },
  {
    IconComponent: Translate,
    name: 'languages',
    to: routes.languages
  }
]

export const userLinks = [
  {
    IconComponent: Group,
    name: 'users',
    to: routes.users.root
  },
  {
    IconComponent: TrendingUp,
    name: 'skills',
    to: routes.skills
  },
  {
    IconComponent: Translate,
    name: 'languages',
    to: routes.languages
  },
  {
    IconComponent: ContactPageOutlined,
    name: 'cvs',
    to: routes.cvs.root
  }
]
