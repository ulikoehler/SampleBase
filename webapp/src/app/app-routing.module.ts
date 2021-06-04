import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SampleComponent }  from './sample/sample.component'
import { SampleSetComponent }  from './sample-set/sample-set.component'
import { SampleSetOverviewComponent }  from './sample-set-overview/sample-set-overview.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { SampleOverviewComponent } from './sample-overview/sample-overview.component';

const routes: Routes = [
  { path: 'sample/:_id', component: SampleComponent },
  { path: 'sample-overview', component: SampleOverviewComponent },
  { path: 'sample-set/:_id', component: SampleSetComponent },
  { path: 'sample-set-overview', component: SampleSetOverviewComponent },
  { path: 'not-found', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
