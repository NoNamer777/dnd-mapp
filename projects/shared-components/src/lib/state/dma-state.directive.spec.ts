import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { StateHarness } from '../testing';
import { DmaStateDirective } from './dma-state.directive';

describe('DmaStateDirective', () => {
    @Component({
        template: `<button dmaState [disabled]="disabled">Button</button>`,
    })
    class TestComponent {
        disabled = false;
    }

    async function setupTestEnvironment(params?: { disabled?: boolean }) {
        TestBed.configureTestingModule({
            imports: [DmaStateDirective],
            declarations: [TestComponent],
        });

        const fixture = TestBed.createComponent(TestComponent);
        const harnessLoader = TestbedHarnessEnvironment.loader(fixture);

        if (params?.disabled) {
            fixture.componentInstance.disabled = params.disabled;
        }
        fixture.detectChanges();

        return {
            element: fixture.nativeElement.querySelector('[dmaState]') as HTMLElement,
            harness: await harnessLoader.getHarness(StateHarness),
        };
    }

    it('should reflect state as attributes', async () => {
        const { element, harness } = await setupTestEnvironment();

        // Initial state
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        // Simulate hovering over the element
        element.dispatchEvent(new MouseEvent('mouseenter'));

        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('92%');

        // Simulate clicking on the element
        element.dispatchEvent(new MouseEvent('mousedown'));

        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeTrue();
        expect(await harness.getAppliedBackgroundStyle()).toContain('82%');

        // Simulate focussing by clicking on the element
        element.dispatchEvent(new MouseEvent('mouseup'));
        element.dispatchEvent(new FocusEvent('focus'));

        expect(await harness.isFocussed()).toBeTrue();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('82%');

        // Simulate moving the mouse away from the element
        element.dispatchEvent(new MouseEvent('mouseleave'));

        expect(await harness.isFocussed()).toBeTrue();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('90%');

        // Simulate clicking outside the element to lose focus
        document.documentElement.dispatchEvent(new MouseEvent('click'));
        element.dispatchEvent(new MouseEvent('blur'));

        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        // Simulate start dragging
        element.dispatchEvent(new MouseEvent('mouseenter'));
        element.dispatchEvent(new MouseEvent('mousedown'));
        element.dispatchEvent(new DragEvent('dragstart'));

        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeTrue();
        expect(await harness.isDragging()).toBeTrue();
        expect(await harness.getAppliedBackgroundStyle()).toContain('66%');

        // simulate stop dragging
        element.dispatchEvent(new DragEvent('dragend'));
        element.dispatchEvent(new MouseEvent('mouseup'));
        element.dispatchEvent(new FocusEvent('focus'));

        expect(await harness.isFocussed()).toBeTrue();
        expect(await harness.isHovered()).toBeTrue();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('82%');
    });

    it('should not remove states when not applied', async () => {
        const { element, harness } = await setupTestEnvironment();

        // Initial state
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new FocusEvent('blur'));
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new MouseEvent('mouseleave'));
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new MouseEvent('mouseup'));
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new MouseEvent('dragend'));
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');
    });

    it('should not apply states when disabled', async () => {
        const { element, harness } = await setupTestEnvironment({ disabled: true });

        // Initial state
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new FocusEvent('focus'));
        expect(await harness.isFocussed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new MouseEvent('mouseenter'));
        expect(await harness.isHovered()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new MouseEvent('mousedown'));
        expect(await harness.isPressed()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');

        element.dispatchEvent(new MouseEvent('dragstart'));
        expect(await harness.isDragging()).toBeFalse();
        expect(await harness.getAppliedBackgroundStyle()).toContain('100%');
    });

    it('should not apply pressing states when not using the primary button', async () => {
        const { element, harness } = await setupTestEnvironment();

        expect(await harness.isPressed()).toBeFalse();

        element.dispatchEvent(new MouseEvent('mousedown', { button: 1 }));
        expect(await harness.isPressed()).toBeFalse();
    });
});
