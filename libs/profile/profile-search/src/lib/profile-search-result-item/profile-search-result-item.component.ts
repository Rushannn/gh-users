import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Profile } from 'api-types';

@Component({
  selector: 'lib-profile-search-result-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-search-result-item.component.html',
  styleUrl: './profile-search-result-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSearchResultItemComponent {

  @Input() profile!: Profile;


}
