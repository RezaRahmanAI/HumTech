import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamService } from '../../core/services/team.service';
import { CtaButtonComponent } from '../../shared/components/cta-button.component';

@Component({
  selector: 'app-admin-team',
  standalone: true,
  imports: [CommonModule, CtaButtonComponent],
  template: `
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-heading text-2xl font-semibold text-secondary-900">Team</h2>
          <p class="text-sm text-secondary-600">Manage leadership bios and social profiles.</p>
        </div>
        <app-cta-button variant="primary" type="button">Add member</app-cta-button>
      </div>
      <div class="overflow-hidden rounded-3xl border border-secondary-100">
        <table class="min-w-full divide-y divide-secondary-100 text-sm">
          <thead class="bg-secondary-50 text-secondary-500">
            <tr>
              <th class="px-4 py-3 text-left font-semibold">Name</th>
              <th class="px-4 py-3 text-left font-semibold">Position</th>
              <th class="px-4 py-3 text-left font-semibold">Social</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-secondary-100 bg-accent">
            <tr *ngFor="let member of team()" class="text-secondary-700">
              <td class="px-4 py-3 font-medium text-secondary-900">{{ member.name }}</td>
              <td class="px-4 py-3">{{ member.position }}</td>
              <td class="px-4 py-3">{{ member.social.length }} links</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminTeamComponent {
  private readonly teamService = inject(TeamService);
  readonly team = toSignal(this.teamService.getAll(), { initialValue: [] });
}
