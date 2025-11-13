import { Lock, Camera } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { getProfile } from '../../shared/api/users';
import { updateProfile } from '../../shared/api/users';
import styles from './Sidebar.module.css';
import userAvatar from '/user-avatar.png';

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({});
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarInputRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      
      const token = localStorage.getItem('pharmaplus_token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }

      try { 
        const profile = await getProfile(token);
        setUser(profile);
        setForm({
          fullName: profile?.fullName || '',
          email: profile?.email || '',
          phone: profile?.phone || '',
          preferences: profile?.preferences || {},
        });
        if (profile?.avatar) setAvatarPreview(`http://localhost:3000/${profile.avatar}`);
        console.log(profile);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <aside className={styles.sidebar}>Loading...</aside>;
console.log(user);
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileSection}>
        <div
          className={styles.avatarWrapper}
          onClick={() => {
            // allow opening file chooser only when editing
            if (editing && avatarInputRef.current) avatarInputRef.current.click();
          }}
          role={editing ? 'button' : undefined}
        >
          <img
            src={avatarPreview ? avatarPreview : `http://localhost:3000/${user?.avatar || 'uploads/avatar.webp'}`}
            alt={user?.fullName || 'Profile'}
            className={styles.profileImage}
          />

          <div
            className={`${styles.avatarOverlay} ${editing ? `${styles.overlayVisible} ${styles.overlayEditing}` : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (editing && avatarInputRef.current) avatarInputRef.current.click();
            }}
          >
            <Camera size={18} />
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files && e.target.files[0];
              if (f) {
                // revoke previous preview if it was an object URL
                if (avatarPreview && avatarPreview.startsWith('blob:')) {
                  try { URL.revokeObjectURL(avatarPreview); } catch (err) {}
                }
                setAvatarFile(f);
                setAvatarPreview(URL.createObjectURL(f));
              }
            }}
            style={{ display: 'none' }}
          />
        </div>
        <h2 className={styles.userName}>{user?.fullName || '—'}</h2>
        <p className={styles.userEmail}>{user?.email || '—'}</p>
      </div>

      <div className={styles.formSection}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Full Name</label>
          <input
            type="text"
            value={editing ? form.fullName : user?.fullName || ''}
            className={styles.input}
            readOnly={!editing}
            onChange={(e) => setForm((s) => ({ ...s, fullName: e.target.value }))}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Email Address</label>
          <input
            type="email"
            value={editing ? form.email : user?.email || ''}
            className={styles.input}
            readOnly={!editing}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Phone Number</label>
          <div className={styles.phoneInput}>
            <input
              type="tel"
              value={editing ? form.phone : user?.phone || ''}
              className={styles.input}
              readOnly={!editing}
              onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))}
            />
          </div>
        </div>

        <button className={styles.changePasswordButton}>
          <Lock size={18} />
          <span>Change Password</span>
        </button>

        <div className={styles.notificationSection}>
          <h3 className={styles.notificationTitle}>Notification Preferences</h3>
          <div className={styles.notificationItem}>
            <span className={styles.notificationLabel}>Email Notifications</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={editing ? !!form.preferences?.newsletter : !!user?.preferences?.newsletter}
                disabled={!editing}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    preferences: { ...(s.preferences || {}), newsletter: e.target.checked },
                  }))
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>

          <div className={styles.notificationItem}>
            <span className={styles.notificationLabel}>SMS Notifications</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={editing ? !!form.preferences?.smsAlerts : !!user?.preferences?.smsAlerts}
                disabled={!editing}
                onChange={(e) =>
                  setForm((s) => ({
                    ...s,
                    preferences: { ...(s.preferences || {}), smsAlerts: e.target.checked },
                  }))
                }
              />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>

        {!editing ? (
          <button
            className={styles.editButton}
            onClick={() => {
              setEditing(true);
              setForm({
                fullName: user?.fullName || '',
                email: user?.email || '',
                phone: user?.phone || '',
                preferences: user?.preferences || {},
              });
            }}
          >
            Edit
          </button>
        ) : (
          <div className={styles.actionRow}>
            <button
              className={styles.saveButton}
              onClick={async () => {
                    setSaving(true);
                    // obtain token from localStorage or fallback to the dev token used earlier
                    const token = localStorage.getItem('pharmaplus_token');
                    try {
                      const id = user?._id || user?.id;
                      if (!id) throw new Error('Missing user id');

                      // If avatar file selected, upload it first as multipart/form-data
                      if (avatarFile) {
                        const fd = new FormData();
                        fd.append('avatar', avatarFile);

                        const r = await fetch(`http://localhost:3000/api/users/${id}`, {
                          method: 'PUT',
                          headers: { Authorization: `Bearer ${token}` },
                          body: fd,
                        });
                        const b = await r.json();
                        if (!r.ok || b?.status !== 'success') {
                          const msg = b?.data?.msg || b?.message || 'Failed to upload avatar';
                          const err = new Error(msg);
                          err.response = b;
                          throw err;
                        }
                        // update local user/avatar preview
                        const updatedAvatarUser = b.data.user;
                        setUser((prev) => ({ ...prev, ...updatedAvatarUser }));
                        if (updatedAvatarUser?.avatar) setAvatarPreview(`http://localhost:3000/${updatedAvatarUser.avatar}`);
                        setAvatarFile(null);
                      }

                      const payload = {
                        fullName: form.fullName,
                        email: form.email,
                        phone: form.phone,
                        preferences: form.preferences,
                      };

                      const updated = await updateProfile(token, id, payload);
                      // backend returns the updated user object
                      setUser((prev) => ({ ...prev, ...updated }));
                      setForm({
                        fullName: updated.fullName || payload.fullName,
                        email: updated.email || payload.email,
                        phone: updated.phone || payload.phone,
                        preferences: updated.preferences || payload.preferences,
                      });
                      setEditing(false);
                    } catch (err) {
                      console.error('Failed to update profile', err);
                      setError(err.message || 'Failed to update profile');
                    } finally {
                      setSaving(false);
                    }
                  }}
            >
                {saving ? 'Saving...' : 'Save'}
            </button>

            <button
              className={styles.cancelButton}
              onClick={() => {
                setEditing(false);
                // reset form to original values
                setForm({ fullName: user?.fullName || '', email: user?.email || '', phone: user?.phone || '', preferences: user?.preferences || {} });
                setAvatarFile(null);
                setAvatarPreview(`http://localhost:3000/${user?.avatar || ''}`);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;


