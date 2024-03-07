import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { LanguagesMap } from 'data-access';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'lib-profile-search-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-search-panel.component.html',
  styleUrl: './profile-search-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSearchPanelComponent implements OnInit {
  @Output() changeSearchParams = new EventEmitter();
  private readonly destroyRef = inject(DestroyRef);
  public searchForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    languages: new FormControl('')
  })

  public languagesMap = Object.values(LanguagesMap);

  ngOnInit() {
    this.searchForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(values => {
        if (values.name) {
          this.onSearchParamsChange(values);
        }
      });
  }

  onSearchParamsChange(value: any) {
    this.changeSearchParams.emit(value);
  }


}

