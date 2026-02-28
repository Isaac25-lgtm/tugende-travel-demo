export function formatCurrency(amount: number, currency: 'USD' | 'UGX' = 'USD'): string {
  if (currency === 'UGX') {
    return `UGX ${amount.toLocaleString()}`;
  }
  return `$${amount.toLocaleString()}`;
}

export function formatRange(min: number, max: number, currency: 'USD' | 'UGX' = 'USD'): string {
  return `${formatCurrency(min, currency)} – ${formatCurrency(max, currency)}`;
}

export function formatDuration(hours: number): string {
  if (hours < 1) return `${Math.round(hours * 60)} min`;
  if (hours === 1) return '1 hour';
  if (hours % 1 === 0) return `${hours} hours`;
  return `${Math.floor(hours)}h ${Math.round((hours % 1) * 60)}m`;
}

export function formatDays(days: number): string {
  if (days === 1) return '1 day';
  return `${days} days`;
}

export function getMonthName(month: number): string {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[month - 1] || '';
}

export function getMonthFullName(month: number): string {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months[month - 1] || '';
}
