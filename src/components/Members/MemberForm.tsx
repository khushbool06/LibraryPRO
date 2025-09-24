import React, { useState, useEffect } from 'react';
import { Member } from '../../types/library';

interface MemberFormProps {
  initialData?: Member;
  onSubmit: (member: Omit<Member, 'id'>) => void;
  onCancel: () => void;
}

const MemberForm: React.FC<MemberFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    membershipType: 'student' as 'student' | 'faculty' | 'public',
    joinDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone,
        address: initialData.address,
        membershipType: initialData.membershipType,
        joinDate: initialData.joinDate
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            placeholder="Enter email address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
            placeholder="Enter phone number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Membership Type *
          </label>
          <select
            required
            value={formData.membershipType}
            onChange={(e) => setFormData({ ...formData, membershipType: e.target.value as 'student' | 'faculty' | 'public' })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          >
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="public">Public</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Address *
          </label>
          <textarea
            required
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent h-24"
            placeholder="Enter complete address"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-amber-700 mb-2">
            Join Date *
          </label>
          <input
            type="date"
            required
            value={formData.joinDate}
            onChange={(e) => setFormData({ ...formData, joinDate: e.target.value })}
            className="w-full px-4 py-3 border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-300 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6 border-t border-amber-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-amber-300 text-amber-700 rounded-xl hover:bg-amber-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-200"
        >
          {initialData ? 'Update Member' : 'Add Member'}
        </button>
      </div>
    </form>
  );
};

export default MemberForm;