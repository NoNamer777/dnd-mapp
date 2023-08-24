import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { StateModule } from './state.module';
import { StateHarness } from '../../testing';

describe('StateComponent', () => {
    @Component({
        template: `<div dma-state [disabled]="disabled"></div>`,
    })
    class TestComponent {
        disabled: string;
    }

    async function setupTestEnvironment(params?: { disabled?: boolean }) {
        TestBed.configureTestingModule({
            imports: [StateModule],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params?.disabled) {
            fixture.componentInstance.disabled = '';
            fixture.detectChanges();
        }
        return {
            element: fixture.nativeElement.querySelector('[dma-state]') as HTMLElement,
            harness: await harnessLoader.getHarness(StateHarness),
        };
    }

    it('should reflect state as attributes', async () => {
        const { element, harness } = await setupTestEnvironment();

        // Initial state
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        // Simulate hovering over the element
        element.dispatchEvent(new MouseEvent('mouseover'));

        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('8%');

        // Simulate clicking on the element
        element.dispatchEvent(new MouseEvent('mousedown'));

        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeTrue();
        expect(await harness.getAppliedBackgroundStyle()).toContain('20%');

        // Simulate focussing by clicking on the element
        element.dispatchEvent(new MouseEvent('mouseup'));
        element.dispatchEvent(new FocusEvent('focus'));

        expect(await harness.isFocussed()).toBeTrue();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('20%');

        // Simulate moving the mouse away from the element
        element.dispatchEvent(new MouseEvent('mouseout'));

        expect(await harness.isFocussed()).toBeTrue();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('12%');

        // Simulate clicking outside the element to lose focus
        document.documentElement.dispatchEvent(new MouseEvent('click'));
        element.dispatchEvent(new MouseEvent('blur'));

        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        // Simulate start dragging
        element.dispatchEvent(new MouseEvent('mouseover'));
        element.dispatchEvent(new MouseEvent('mousedown'));
        element.dispatchEvent(new DragEvent('dragstart'));

        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeTrue();
        expect(await harness.isDragging()).toBeTrue();
        expect(await harness.getAppliedBackgroundStyle()).toContain('36%');

        // simulate stop dragging
        element.dispatchEvent(new DragEvent('dragend'));
        element.dispatchEvent(new MouseEvent('mouseup'));
        element.dispatchEvent(new FocusEvent('focus'));

        expect(await harness.isFocussed()).toBeTrue();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('20%');
    });

    it('should not remove states when not applied', async () => {
        const { element, harness } = await setupTestEnvironment();

        // Initial state
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new FocusEvent('blur'));
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new MouseEvent('mouseout'));
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new MouseEvent('mouseup'));
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new MouseEvent('dragend'));
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');
    });

    it('should not apply states when disabled', async () => {
        const { element, harness } = await setupTestEnvironment({ disabled: true });

        // Initial state
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new FocusEvent('focus'));
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new MouseEvent('mouseover'));
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new MouseEvent('mousedown'));
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');

        element.dispatchEvent(new MouseEvent('dragstart'));
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('0%');
    });
});
