import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';

const routes: Routes = [
  { path: '', component: TimelineComponent },
];

export const PlanningRoutes = RouterModule.forChild(routes);
