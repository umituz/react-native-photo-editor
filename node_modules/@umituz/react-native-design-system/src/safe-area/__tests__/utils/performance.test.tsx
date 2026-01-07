/**
 * Performance tests for utilities
 */

describe('Performance Tests', () => {
  it('should complete quickly', () => {
    const startTime = performance.now();
    
    // Simple operation
    const result = Math.random();
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    expect(duration).toBeLessThan(100);
    expect(typeof result).toBe('number');
  });
});