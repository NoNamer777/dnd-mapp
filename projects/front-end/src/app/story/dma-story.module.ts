import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { storyRoutes } from './config/story.routes';

@NgModule({
    imports: [RouterModule.forChild(storyRoutes)],
    exports: [RouterModule],
})
export class DmaStoryModule {}
